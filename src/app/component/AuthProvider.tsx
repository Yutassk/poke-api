"use client";
import { onAuthStateChanged } from "firebase/auth";
import React, { FC, ReactNode, createContext, useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

type Props = {
  children: ReactNode;
};

type AuthType = {
  uid: string;
  setUid: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

// export const AuthContext = createContext(0);
export const AuthContext = createContext<AuthType>({
  uid: "",
  setUid: () => {},
  name: "",
  setName: () => {},
});

export const AuthProvider: FC<Props> = (props) => {
  const { children } = props;

  const [uid, setUid] = useState<string>("");
  const [name, setName] = useState<string>("");

  const contextValue = {
    uid,
    setUid,
    name,
    setName,
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = (await getDoc(docRef)).data()!;
        setUid(user.uid);
        setName(docSnap.display_name);
      } else {
        console.log("ログインしていませｎ");
      }
    });
  }, []);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
