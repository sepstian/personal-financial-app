import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdsVE-8kh8KIKa4FA87HdMPqFzszfHoEg",
  authDomain: "personal-finansial.firebaseapp.com",
  projectId: "personal-finansial",
  storageBucket: "personal-finansial.appspot.com",
  messagingSenderId: "653349130435",
  appId: "1:653349130435:web:dd15ca4da579494e01d276",
  measurementId: "G-5V5QQTD13J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
