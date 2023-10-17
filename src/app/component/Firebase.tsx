import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";

export const firebaseConfig = {
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
export const addResult = async (score: number, exam: number, uid: string) => {
  const usersRef = collection(db, "users");

  try {
    const userDocRef = doc(usersRef, uid);
    const resultsRef = collection(userDocRef, "results");

    const newResults = {
      date: serverTimestamp(),
      score: score,
      exam: exam,
    };

    await addDoc(resultsRef, newResults);

    console.log("Document written with ID:", uid);
  } catch (e) {
    console.error("Error adding document:", e);
  }
};

// お気に入りポケモンの番号登録
export const addFavorite = async (favorite: number, uid: string) => {
  try {
    const usersRef = updateDoc(doc(db, "users", uid), {
      favorite: favorite,
    });
    console.log(usersRef);
  } catch (e) {
    console.error("Error adding document:", e);
  }
};

export const SignOut = () => {
  signOut(auth);
};
