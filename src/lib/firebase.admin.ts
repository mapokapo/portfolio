import "server-only";
import admin from "firebase-admin";

export function getFirebaseAdmin(): null | typeof admin {
  return tryInitialize() ? admin : null;
}

export function isFirebaseConfigured(): boolean {
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  return typeof key === "string" && key.trim().length > 0;
}

function tryInitialize(): boolean {
  if (admin.apps.length > 0) {
    return true;
  }

  if (!isFirebaseConfigured()) {
    return false;
  }

  try {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY!
    ) as admin.ServiceAccount;

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    return true;
  } catch (error) {
    console.error("Firebase admin initialization error: ", error);
    return false;
  }
}

export default admin;
