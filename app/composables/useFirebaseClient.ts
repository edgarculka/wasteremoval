import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export function useFirebaseClient() {
  if (!import.meta.client) return null;

  const runtimeConfig = useRuntimeConfig();
  const firebaseConfig = runtimeConfig.public.firebase as FirebaseOptions;
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  return {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
  };
}
