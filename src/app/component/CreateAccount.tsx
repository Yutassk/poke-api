"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseConfig } from "./Firebase";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const CreateAccount = (name: string, email: string, password: string, router: string[] | AppRouterInstance) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // アカウント作成
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      try {
        const userRef = setDoc(doc(db, "users", user.uid), {
          screen_name: user.uid,
          display_name: name,
          created_at: serverTimestamp(),
          favorite: 0,
        });
        console.log(`${userRef}:でユーザー登録しました`);
        router.push("/");
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

export default CreateAccount;
