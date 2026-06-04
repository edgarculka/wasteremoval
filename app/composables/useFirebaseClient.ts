import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

interface FirebaseClientServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

let firebaseServicesPromise: Promise<FirebaseClientServices | null> | null = null;

export async function useFirebaseClient() {
  if (!import.meta.client) return null;

  firebaseServicesPromise ??= (async () => {
    const [{ getApp, getApps, initializeApp }, { getAuth }, { getFirestore }] =
      await Promise.all([
        import("firebase/app"),
        import("firebase/auth"),
        import("firebase/firestore"),
      ]);
    const runtimeConfig = useRuntimeConfig();
    const firebaseConfig = runtimeConfig.public.firebase as FirebaseOptions;
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

    return {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
    };
  })();

  return firebaseServicesPromise;
}
