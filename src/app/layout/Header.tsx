import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="mb-6">
      <Link href={"/"}>
        <h1 className="py-2 text-sky-600 font-bold text-3xl">ポケモンクイズ</h1>
      </Link>
    </div>
  );
};

export default Header;
