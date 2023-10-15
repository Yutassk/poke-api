"use client";
import Link from "next/link";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Image from "next/image";
import SignInBtn from "./component/SignInBtn";
import { useContext } from "react";
import { AuthContext } from "./component/AuthProvider";

export default function Home() {
  const { uid } = useContext(AuthContext);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Header />
        <SignInBtn />
      </div>

      <div>
        <div className="w-full m-auto">
          <div className="group hover:bg-rose-300 transition-all duration-200 ease-linear py-4 px-9">
            <Link className="flex items-center justify-between" href={"/quiz"}>
              <Image className="group-hover:animate-bounce" src={"/pokeballicon.png"} width={100} height={100} alt="" />
              <h3 className="text-2xl">クイズをはじめる</h3>
            </Link>
          </div>
          <div className="group hover:bg-green-300 transition-all duration-200 ease-linear py-4 px-9">
            <Link className="flex items-center justify-between" href={"/pokedex"}>
              <Image className="group-hover:animate-bounce" src={"/rotom.png"} width={100} height={100} alt="" />
              <h3 className="text-2xl">ポケモン図鑑</h3>
            </Link>
          </div>
          {uid && (
            <div className="group hover:bg-green-300 transition-all duration-200 ease-linear py-4 px-9">
              <Link className="flex items-center justify-between" href={"/mypage"}>
                <Image className="group-hover:animate-bounce rounded-full" src={"/room.png"} width={100} height={100} alt="" />
                <h3 className="text-2xl">マイページ</h3>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
