"use client";
import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const AuthState = () => {
  const { uid, name } = useContext(AuthContext);

  return (
    <div>
      <div>{`uid : ${uid}`}</div>
      <div>{`username : ${name}`}</div>
    </div>
  );
};

export default AuthState;
