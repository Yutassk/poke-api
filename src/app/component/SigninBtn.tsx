import Link from "next/link";
import React from "react";

const SigninBtn = () => {
  return (
    <div className="flex justify-around">
      <Link href={"/signup"}>
        <button className="bg-sky-600 rounded-md p-2 text-white text-xs m-2">サインアップ</button>
      </Link>
      <Link href={"/login"}>
        <button className="bg-rose-600 rounded-md p-2 text-white text-xs m-2">ログイン</button>
      </Link>
    </div>
  );
};

export default SigninBtn;
