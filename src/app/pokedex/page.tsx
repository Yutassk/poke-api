"use client";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SignInBtn from "../component/SignInBtn";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokeIndex, setPokeIndex] = useState<number[]>([]);

  useEffect(() => {
    const generatePokeDex = () => {
      let num: number[] = new Array(20);
      for (let i = 0; i < 20; i++) {
        num[i] = i + 1;
      }
      setPokeIndex(num);
    };
    generatePokeDex();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Header />
        <SignInBtn />
      </div>

      <div className="mx-4">
        <h3 className="text-3xl">ポケモン図鑑</h3>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {pokeIndex.map((pokeNum, index) => (
          <Image width={200} height={200} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`} alt="" key={index} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
