import "server-only";
import admin from "firebase-admin";

const serviceAccount: admin.ServiceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  } catch (error) {
    console.error("Firebase admin initialization error: ", error);
  }
}

export default admin;
