/* ============================================================
   NEW SANSKAR ACADEMY HIGHER SECONDARY SCHOOL
   100% FREE FIREBASE CLOUD DATABASE & REAL-TIME SETUP (firebase-config.js)
   ============================================================
   
   HOW TO CONNECT IN 2 MINUTES (100% FREE TIER):
   1. Go to https://console.firebase.google.com/
   2. Click "Add Project" -> Name it "New Sanskar Academy" -> Create.
   3. In Firebase Console:
      - Go to "Build" -> "Authentication" -> Click "Get Started" -> Enable "Email/Password".
      - Go to "Build" -> "Firestore Database" -> Click "Create Database" -> Start in test mode or production.
   4. Click the gear icon ⚙️ (Project Settings) -> "General" -> "Your apps" -> Click the Web (</>) icon.
   5. Copy your firebaseConfig and paste it below!
   ============================================================ */

// Replace the placeholder values with your free Firebase project keys:
const FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Check if Firebase keys are configured
const isFirebaseReady = FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.apiKey.startsWith("YOUR_");

if (isFirebaseReady) {
  console.log("🔥 Firebase Cloud Backend connected for New Sanskar Academy Higher Secondary School!");
} else {
  console.info("ℹ️ Using local browser database (db.js). To enable cloud real-time sync across devices, paste your free Firebase keys in firebase-config.js.");
}
