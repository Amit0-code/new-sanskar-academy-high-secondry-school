/* ============================================================
   NEW SANSKAR ACADEMY HIGHER SECONDARY SCHOOL
   FREE FIREBASE CLOUD DATABASE & REAL-TIME BACKEND (firebase-config.js)
   ============================================================ */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBGC2VC_jOkoawrrvgDfKxjCHGZ0BOiRVc",
  authDomain: "new-sanskar-academy-higher-sec.firebaseapp.com",
  projectId: "new-sanskar-academy-higher-sec",
  storageBucket: "new-sanskar-academy-higher-sec.firebasestorage.app",
  messagingSenderId: "370347326609",
  appId: "1:370347326609:web:1c583c7200b2eb9e1ed330",
  measurementId: "G-QHTT0LFETY"
};

let firebaseApp = null;
let firestoreDb = null;

try {
  if (typeof firebase !== 'undefined' && FIREBASE_CONFIG.apiKey) {
    if (!firebase.apps.length) {
      firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
    } else {
      firebaseApp = firebase.app();
    }
    firestoreDb = firebase.firestore();
    console.log("🔥 Firebase Cloud Backend connected for New Sanskar Academy Higher Secondary School!");
  }
} catch (e) {
  console.warn("Firebase initialization status:", e.message);
}
