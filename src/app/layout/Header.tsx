"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../component/AuthProvider";

const Header = () => {
  const { name } = useContext(AuthContext);
  return (
    <div className="mb-6">
      <Link href={"/"}>
        <h1 className="py-2 mx-2 text-sky-600 font-bold text-3xl">ポケモンクイズ</h1>
      </Link>
      <p>{`${name}でログイン中`}</p>
    </div>
  );
};

export default Header;
