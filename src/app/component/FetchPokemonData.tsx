import Image from "next/image";
import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const FetchPokemonData = () => {
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

  return (
    <div>
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
    </div>
  );
};
