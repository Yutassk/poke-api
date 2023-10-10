"use client";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SignInBtn from "../component/SignInBtn";
import Image from "next/image";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

export default function Home() {
  const [pokeIndex, setPokeIndex] = useState<number[]>([1, 2, 3, 4]);
  const [modal, setModal] = useState<number>(0);
  const [pokeName, setPokeName] = useState<string>("");
  const [pokeType, setPokeType] = useState<string[]>([]);

  const loadMore = () => {
    const nextIndex = [];
    const lastNum = pokeIndex[pokeIndex.length - 1];
    for (let i = 1; i < 5; i++) {
      nextIndex.push(lastNum + i);
    }
    setPokeIndex([...pokeIndex, ...nextIndex]);
  };

  const fetchPokemonData = async (props: number | string) => {
    try {
      // ポケモンの全データ
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props}/`);
      const data = await response.json();

      // ポケモンの名前取得
      const fetchPokemonName = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.species.name}/`);
      const fetchPokemonNameData = await fetchPokemonName.json();
      const japaneseName = fetchPokemonNameData.names.find((name: { language: { name: string } }) => name.language.name === "ja").name;
      setPokeName(japaneseName);

      // ポケモンのタイプ取得
      data.types.map(async (slot: { type: { name: string } }) => {
        const fetchPokemonType = await fetch(`https://pokeapi.co/api/v2/type/${slot.type.name}/`);
        const fetchPokemonTypeData = await fetchPokemonType.json();
        const jaType = fetchPokemonTypeData.names.find((name: { language: { name: string } }) => name.language.name === "ja").name;
        setPokeType((prevPokeType) => [...prevPokeType, jaType]);
      });
    } catch (error) {
      console.error("Error fetching Pokemon name:", error);
      return "";
    }
  };

  const handlePokeDetail = (index: number) => {
    setModal(index);
    fetchPokemonData(index);
  };

  const closedModal = () => {
    setModal(0);
    setPokeName("");
    setPokeType([]);
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

      {modal > 0 && (
        <div className="group" onClick={closedModal}>
          <div className="block w-full h-full bg-black/70 fixed top-0 left-0">
            <div className="block w-3/4 mx-auto mt-20 bg-white">
              <Image width={200} height={200} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${modal}.png`} alt="" />
              <p>{pokeName}</p>
              {pokeType.map((type) => (
                <p key={type}>{type}</p>
              ))}
              <button onClick={() => console.log(pokeType)}>koko</button>
            </div>
          </div>
        </div>
      )}

      <InfiniteScroll loadMore={loadMore} hasMore={true} loader={loader}>
        {items}
      </InfiniteScroll>

      <Footer />
    </div>
  );
}
