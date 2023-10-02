"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="">
      <Link href={"/"}>
        <h1 className="py-2 mx-2 text-sky-600 font-bold text-3xl">ポケモンクイズ</h1>
      </Link>
    </div>
  );
};

export default Header;
