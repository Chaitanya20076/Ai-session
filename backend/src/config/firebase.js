import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let isFirebaseInitialized = false;
let db = null;
let auth = null;
let storage = null;

export const initFirebaseAdmin = () => {
  if (admin.apps.length > 0) {
    isFirebaseInitialized = true;
    db = admin.firestore();
    auth = admin.auth();
    return { admin, db, auth, storage, isFirebaseInitialized: true };
  }

  try {
    let credential = null;

    // Check 1: Raw JSON string or Base64 in environment variable
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      try {
        let keyString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
        // Check if base64 encoded
        if (!keyString.startsWith('{') && keyString.length > 50) {
          keyString = Buffer.from(keyString, 'base64').toString('utf-8');
        }
        const serviceAccount = JSON.parse(keyString);
        credential = admin.credential.cert(serviceAccount);
      } catch (parseError) {
        console.warn('⚠️ Warning: Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY env var:', parseError.message);
      }
    }

    // Check 2: File path in environment variable or default path
    if (!credential) {
      const defaultPaths = [
        process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
        path.resolve(process.cwd(), 'config', 'serviceAccountKey.json'),
        path.resolve(process.cwd(), 'serviceAccountKey.json')
      ].filter(Boolean);

      for (const p of defaultPaths) {
        if (fs.existsSync(p)) {
          const serviceAccount = JSON.parse(fs.readFileSync(p, 'utf8'));
          credential = admin.credential.cert(serviceAccount);
          console.log(`✅ Loaded Firebase service account from: ${p}`);
          break;
        }
      }
    }

    if (credential) {
      admin.initializeApp({
        credential,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
      });
      isFirebaseInitialized = true;
      db = admin.firestore();
      auth = admin.auth();
      storage = admin.storage ? admin.storage() : null;
      console.log('✅ Firebase Admin SDK successfully initialized.');
    } else {
      console.warn('⚠️ [Firebase Admin] Service account key not detected. Operating in simulated/unauthenticated development mode.');
      console.warn('ℹ️ To enable live Firebase authentication and Firestore, place `serviceAccountKey.json` in `backend/config/` or set `FIREBASE_SERVICE_ACCOUNT_KEY`.');
    }
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin SDK:', error.message);
  }

  return { admin, db, auth, storage, isFirebaseInitialized };
};

export { admin, db, auth, storage, isFirebaseInitialized };
