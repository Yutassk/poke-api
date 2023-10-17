"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Header from "../layout/Header";
import Link from "next/link";
// import { createAccount } from "../component/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import CreateAccount from "../component/CreateAccount";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isRevealPassword, setIsRevealPassword] = useState<boolean>(false);

  const router = useRouter();

  const doSetName = (e: string) => {
    setNewName(e);
  };

  const doSetEmail = (e: string) => {
    setNewEmail(e);
  };

  const doSetPassword = (e: string) => {
    setNewPassword(e);
  };

  const createBtn = () => {
    if (newEmail && newPassword) {
      // createAccount(newName, newEmail, newPassword);
      CreateAccount(newName, newEmail, newPassword, router);
    }
  };

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="mx-3">
          {/* Signupと説明部分 */}
          <div className="my-4 space-y-2">
            <h2 className="font-semibold text-3xl">Sign Up</h2>
            <p className="text-sm text-slate-700">Create an account to record your Pokémon quiz results and register your favorite Pokémon!</p>
          </div>
          {/* 他サイト使用でのログイン */}
          <div className="text-center">
            <div className="border border-slate-200 w-full font-medium py-2 text-sm"> Continue with Google</div>
          </div>
          {/* OR部分 */}
          <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
            <div className="h-px w-full bg-slate-200"></div>
            <div>OR</div>
            <div className="h-px w-full bg-slate-200"></div>
          </div>
          {/* アドレス、パスワード入力エリア */}
          <div className="space-y-3">
            <div className="mb-2 flex flex-col gap-2">
              <input className="border border-slate-200 rounded-lg py-2 px-3 w-full" type="text" placeholder="Your Name" name="name" onChange={(e) => doSetName(e.target.value)} />
              <input className="border border-slate-200 rounded-lg py-2 px-3 w-full" type="email" placeholder="Email Address" name="email" onChange={(e) => doSetEmail(e.target.value)} />
              <div className="relative">
                <input
                  className="w-full py-2 px-3 border border-slate-200 rounded-lg"
                  type={isRevealPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={(e) => doSetPassword(e.target.value)}
                />
                {isRevealPassword ? (
                  <FontAwesomeIcon icon={faEye} className="absolute top-3 right-3" onClick={togglePassword} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} className="absolute top-3 right-3 text-slate-400" onClick={togglePassword} />
                )}
              </div>
            </div>

            <Link className="text-sm text-blue-800" href={"/"}>
              Reset your password?
            </Link>
            <button
              className={`${newName && newEmail && newPassword ? "bg-black" : "bg-slate-400 pointer-events-none"} rounded-md text-sm text-white font-medium w-full py-3`}
              onClick={() => createBtn()}
            >
              Continue to Verify Email
            </button>

            <div className="text-sm mt-6">
              <p>
                Already have an account?
                <span className="font-medium text-blue-700 ml-1">
                  <Link href={"/login"}>Login</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
