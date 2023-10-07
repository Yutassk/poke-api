"use client";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SignInBtn from "../component/SignInBtn";
import Image from "next/image";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

export default function Home() {
  const [pokeIndex, setPokeIndex] = useState<number[]>([1, 2, 3, 4]);

  const loadMore = () => {
    const nextIndex = [];
    const lastNum = pokeIndex[pokeIndex.length - 1];
    for (let i = 1; i < 5; i++) {
      nextIndex.push(lastNum + i);
    }
    setPokeIndex([...pokeIndex, ...nextIndex]);
  };

  const handlePokeDetail = (num) => {
    console.log(num);
  };

  const items = (
    <div className="grid grid-cols-4 gap-4">
      {pokeIndex.map((pokeNum, index) => (
        <Image
          width={200}
          height={200}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`}
          alt=""
          key={index}
          onClick={() => handlePokeDetail(pokeNum)}
        />
      ))}
    </div>
  );

  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Header />
        <SignInBtn />
      </div>

      <div className="mx-4">
        <h3 className="text-3xl">ポケモン図鑑</h3>
        <p>好きなポケモンを登録しよう</p>
      </div>

      <InfiniteScroll loadMore={loadMore} hasMore={true} loader={loader}>
        {items}
      </InfiniteScroll>
      <Footer />
    </div>
  );
}
