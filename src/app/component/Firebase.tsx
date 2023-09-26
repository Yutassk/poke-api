import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import firebase from "firebase/compat/app";
import { FieldValue, Firestore, addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

// 結果をDBに保存
export const addResult = async (score: number, exam: number) => {
  try {
    const docRef = await addDoc(collection(db, "results"), {
      score: score,
      exam: exam,
    });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
};

// アカウント作成
export const createAccount = (name: string, email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user:", user.uid);
      try {
        const userRef = setDoc(doc(db, "users", user.uid), {
          screen_name: user.uid,
          display_name: name,
          created_at: serverTimestamp(),
        });
        console.log(userRef);
      } catch (e) {
        console.error("Error adding document:", e);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error:", errorCode, errorMessage);
    });
};

export const SignOut = () => {
  signOut(auth);
};
