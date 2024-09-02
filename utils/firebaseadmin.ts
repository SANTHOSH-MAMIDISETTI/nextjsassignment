import admin from 'firebase-admin';
import path from 'path';

if (!admin.apps.length) {
  const serviceAccountPath = path.join(process.cwd(), 'utils/serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
    storageBucket: 'nextjstaskproject.appspot.com',
  });
}

const bucket = admin.storage().bucket();

export { bucket };
