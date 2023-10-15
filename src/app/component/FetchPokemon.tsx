"use client";
import React, { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  type: string;
  height: number;
  weight: number;
  abilities: string;
}

const FetchPokemon = () => {
  const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemonData, setPokemonData] = useState([]);

  const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };
  const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(pokeApiUrl);
      loadPokemon(res.results);
    };
    fetchPokemonData();
  }, []);

  const handleTest = () => {
    pokemonData.map((pokemon) => {
      return console.log(pokemon.name);
    });
  };
  //   const fetchPokemonData = async (props: number | string) => {
  //     try {
  //       // ポケモンの全データ
  //       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props}/`);
  //       const data = await response.json();

  //       // ポケモンの名前取得
  //       const fetchPokemonName = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.species.name}/`);
  //       const fetchPokemonNameData = await fetchPokemonName.json();
  //       const japaneseName = fetchPokemonNameData.names.find((name: { language: { name: string } }) => name.language.name === "ja").name;
  //       setPokeData((prevData) => {
  //         return { ...prevData, name: japaneseName };
  //       });

  //       // ポケモンのタイプ取得
  //       data.types.map(async (slot: { type: { name: string } }) => {
  //         const fetchPokemonType = await fetch(`https://pokeapi.co/api/v2/type/${slot.type.name}/`);
  //         const fetchPokemonTypeData = await fetchPokemonType.json();
  //         const jaType = fetchPokemonTypeData.names.find((name: { language: { name: string } }) => name.language.name === "ja").name;
  //         setPokeData((prevData) => {
  //           const formattedType = `${prevData.type.length > 0 ? " / " : ""}${jaType}`;
  //           return { ...prevData, type: `${prevData.type}${formattedType}` };
  //         });
  //       });

  //       // ポケモンの身長、体重
  //       setPokeData((prevData) => {
  //         return { ...prevData, height: data.height / 10, weight: data.weight / 10 };
  //       });

  //       // ポケモンの特徴
  //       data.abilities.map(async (n: { ability: { name: any } }) => {
  //         const fetchPokemonAbilities = await fetch(`https://pokeapi.co/api/v2/ability/${n.ability.name}/`);
  //         const fetchPokemonAbilitiesData = await fetchPokemonAbilities.json();
  //         const jaAbilities = fetchPokemonAbilitiesData.names.find((name: { language: { name: string } }) => name.language.name === "ja").name;
  //         setPokeData((prevData) => {
  //           const formattedAbilities = `${prevData.abilities.length > 0 ? " / " : ""}${jaAbilities}`;
  //           return { ...prevData, abilities: `${prevData.abilities}${formattedAbilities}` };
  //         });
  //       });
  //     } catch (error) {
  //       console.error("Error fetching Pokemon name:", error);
  //       return "";
  //     }
  //   };

  return (
    <div>
      <button onClick={handleTest}>FetchPage</button>
    </div>
  );
};

export default FetchPokemon;
