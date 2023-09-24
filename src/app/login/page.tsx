"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Header from "../layout/Header";
import Link from "next/link";
import { createAccount } from "../component/Firebase";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const doSetEmail = (email: string) => {
    setEmail(email);
  };

  const doSetPassword = (password: string) => {
    setPassword(password);
  };

  const createBtn = () => {
    if (email && password) {
      createAccount(email, password);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="mx-3">
          {/* Loginと説明部分 */}
          <div className="my-4 space-y-2">
            <h2 className="font-semibold text-3xl">Login</h2>
            <p className="text-sm text-slate-700">Welcome back! Let's take you to your account.</p>
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
              <input className="border border-slate-200 rounded-lg py-2 px-3 w-full" type="email" placeholder="Email Address" name="email" onChange={(e) => doSetEmail(e.target.value)} />
              <input className="border border-slate-200 rounded-lg py-2 px-3 w-full" type="password" placeholder="Password" name="password" onChange={(e) => doSetPassword(e.target.value)} />
            </div>

            <Link className="text-sm text-blue-800" href={"/"}>
              Reset your password?
            </Link>
            <button className={`${email && password ? "bg-black" : "bg-slate-400 pointer-events-none"} rounded-md text-sm text-white font-medium w-full py-3`} onClick={() => createBtn()}>
              Continue
            </button>

            <div className="text-sm mt-6">
              <p>
                Don't have an account?
                <span className="font-medium text-blue-700">
                  <Link href={"/"}> Sign up</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
