"use client";
import React, { useEffect } from "react";
import { auth, db, app } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthState = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
      } else {
        console.log("ログインしていませｎ");
      }
    });
  }, []);
  return <div>AuthState</div>;
};

export default AuthState;
