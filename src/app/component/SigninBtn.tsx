"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthProvider";

const SignInBtn = () => {
  const { uid, setUid, name, setName } = useContext(AuthContext);
  const router = useRouter();

  const SignOut = () => {
    signOut(auth);
    setUid("");
    setName("");
    router.refresh();
  };

  return (
    <div>
      {uid ? (
        <div className="flex items-center space-x-2">
          <div className="text-xs">{`${name}でログイン中`}</div>
          <Link href={"/mypage"}>
            <button className="bg-rose-500 rounded-md text-white text-xs m-2 p-2">マイページ</button>
          </Link>
          <button className="bg-slate-500 rounded-md text-white text-xs m-2 p-2" onClick={SignOut}>
            サインアウトする
          </button>
        </div>
      ) : (
        <div className="flex justify-around">
          <Link href={"/signup"}>
            <button className="bg-sky-600 rounded-md p-2 text-white text-xs m-2">サインアップ</button>
          </Link>
          <Link href={"/login"}>
            <button className="bg-rose-600 rounded-md p-2 text-white text-xs m-2">ログイン</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignInBtn;
