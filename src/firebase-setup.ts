import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: <string>process.env.FIREBASE_DB
});

export default app;