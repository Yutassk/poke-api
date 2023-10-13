"use client";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Image from "next/image";
import { useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { addFavorite } from "../component/Firebase";
import { AuthContext } from "../component/AuthProvider";
import SignInBtn from "../component/SignInBtn";

interface Pokemon {
  name: string;
  type: string;
  height: number;
  weight: number;
  abilities: string;
}

export default function Home() {
  const { uid } = useContext(AuthContext);

  const [pokeIndex, setPokeIndex] = useState<number[]>([1, 2, 3, 4]);
  const [pokeNum, setPokeNum] = useState<number>(0);
  const [pokeData, setPokeData] = useState<Pokemon>({
    name: "",
    type: "",
    height: 0,
    weight: 0,
    abilities: "",
  });

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
      setPokeData((prevData) => {
        return { ...prevData, name: japaneseName };
      });

      // ポケモンのタイプ取得
      data.types.map(async (slot: { type: { name: string } }) => {
        const fetchPokemonType = await fetch(`https://pokeapi.co/api/v2/type/${slot.type.name}/`);
        const fetchPokemonTypeData = await fetchPokemonType.json();
        const jaType = fetchPokemonTypeData.names.find((name: { language: { name: string } }) => name.language.name === "ja").name;
        setPokeData((prevData) => {
          const formattedType = `${prevData.type.length > 0 ? " / " : ""}${jaType}`;
          return { ...prevData, type: `${prevData.type}${formattedType}` };
        });
      });

      // ポケモンの身長、体重
      setPokeData((prevData) => {
        return { ...prevData, height: data.height / 10, weight: data.weight / 10 };
      });

      // ポケモンの特徴
      data.abilities.map(async (n: { ability: { name: any } }) => {
        const fetchPokemonAbilities = await fetch(`https://pokeapi.co/api/v2/ability/${n.ability.name}/`);
        const fetchPokemonAbilitiesData = await fetchPokemonAbilities.json();
        const jaAbilities = fetchPokemonAbilitiesData.names.find((name: { language: { name: string } }) => name.language.name === "ja").name;
        setPokeData((prevData) => {
          const formattedAbilities = `${prevData.abilities.length > 0 ? " / " : ""}${jaAbilities}`;
          return { ...prevData, abilities: `${prevData.abilities}${formattedAbilities}` };
        });
      });
    } catch (error) {
      console.error("Error fetching Pokemon name:", error);
      return "";
    }
  };

  const handlePokeDetail = (index: number) => {
    setPokeNum(index);
    fetchPokemonData(index);
  };

  const closedModal = () => {
    setPokeNum(0);

    setPokeData({
      name: "",
      type: "",
      height: 0,
      weight: 0,
      abilities: "",
    });
  };

  // infinite scrollerで必要な関数
  const items = (
    <div className="grid grid-cols-4 gap-4">
      {pokeIndex.map((num, index) => (
        <Image
          width={200}
          height={200}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png`}
          alt=""
          key={index}
          onClick={() => handlePokeDetail(num)}
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

      {pokeNum > 0 && (
        <div className="group" onClick={closedModal}>
          <div className="block w-full h-full bg-black/70 fixed top-0 left-0">
            <div className="block w-3/4 mx-auto mt-20 py-6 bg-white">
              <div className="flex flex-col items-center">
                <Image width={200} height={200} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`} alt="" />
                <div className="text-center my-2 space-y-2">
                  <p className="font-bold text-xl">{pokeData.name}</p>
                  <div className="flex">
                    <p>タイプ：</p>
                    <p>{pokeData.type}</p>
                  </div>
                </div>
                <div className="leading-relaxed">
                  <p>{`重さ：${pokeData.weight} kg`}</p>
                  <p>{`高さ：${pokeData.height} m`}</p>
                  <div className="flex ">
                    <p>能力：</p>
                    <p>{pokeData.abilities}</p>
                  </div>
                </div>
                <button className="bg-rose-400 rounded-md text-white text-center mt-6 px-2 hover:bg-rose-500 hover:translate-y-px" onClick={() => addFavorite(pokeNum, uid)}>
                  お気に入りに登録
                </button>
              </div>
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
