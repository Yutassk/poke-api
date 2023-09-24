import Link from "next/link";
import React from "react";

const SigninBtn = () => {
  return (
    <div>
      <Link href={"/login"}>
        <button className="bg-sky-600 rounded-md p-2 text-white text-xs m-2">サインイン / ログイン</button>
      </Link>
    </div>
  );
};

export default SigninBtn;
