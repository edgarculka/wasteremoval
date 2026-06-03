import type { Auth, User } from "firebase/auth";
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

export function useAdminAuth() {
  const runtimeConfig = useRuntimeConfig();
  const allowedDomain = normalizeDomain(
    String(runtimeConfig.public.adminEmailDomain || "dbs-waste.co.uk"),
  );
  const user = useState<User | null>("admin-auth-user", () => null);
  const ready = useState("admin-auth-ready", () => false);
  const authError = useState("admin-auth-error", () => "");
  const isSigningIn = useState("admin-auth-signing-in", () => false);

  const emailDomain = computed(() => getEmailDomain(user.value?.email));
  const isAllowedAdmin = computed(() => emailDomain.value === allowedDomain);

  function assertAllowedDomain(nextUser: User | null) {
    if (!nextUser) return false;

    const domain = getEmailDomain(nextUser.email);
    return domain === allowedDomain;
  }

  async function acceptAdminUser(
    auth: Auth,
    nextUser: User | null,
    invalidMessage: string,
  ) {
    if (!nextUser) {
      user.value = null;
      return false;
    }

    await nextUser.reload().catch(() => {});
    const currentUser = auth.currentUser ?? nextUser;

    if (assertAllowedDomain(currentUser)) {
      user.value = currentUser;
      authError.value = "";
      return true;
    }

    authError.value = invalidMessage;
    await signOut(auth);
    user.value = null;
    return false;
  }

  onMounted(() => {
    const services = useFirebaseClient();
    if (!services) return;

    ready.value = false;

    const unsubscribe = onAuthStateChanged(services.auth, async (nextUser) => {
      await acceptAdminUser(
        services.auth,
        nextUser,
        "This Google account cannot access admin.",
      );
      ready.value = true;
      isSigningIn.value = false;
    });

    void getRedirectResult(services.auth)
      .then(async (result) => {
        if (!result?.user) return;

        await acceptAdminUser(
          services.auth,
          result.user,
          "This Google account cannot access admin.",
        );
        ready.value = true;
      })
      .catch((error) => {
        authError.value =
          error instanceof Error
            ? error.message
            : "Google sign-in was not completed.";
        ready.value = true;
      })
      .finally(() => {
        isSigningIn.value = false;
      });

    onUnmounted(unsubscribe);
  });

  async function signInWithGoogle() {
    const services = useFirebaseClient();
    if (!services) return;

    isSigningIn.value = true;
    authError.value = "";

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(services.auth, provider);

      await acceptAdminUser(
        services.auth,
        result.user,
        "This Google account cannot access admin.",
      );
      ready.value = true;
      isSigningIn.value = false;
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        String(error.code).includes("popup")
      ) {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        await signInWithRedirect(services.auth, provider);
        return;
      }

      authError.value =
        error instanceof Error
          ? error.message
          : "Google sign-in was not completed.";
      isSigningIn.value = false;
    }
  }

  async function signOutAdmin() {
    const services = useFirebaseClient();
    user.value = null;
    authError.value = "";
    await navigateTo("/");
    if (!services) return;
    await signOut(services.auth);
  }

  return {
    allowedDomain,
    authError,
    isAllowedAdmin,
    isSigningIn,
    ready,
    signInWithGoogle,
    signOutAdmin,
    user,
  };
}
