"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const PokeApiUrl = "https://pokeapi.co/api/v2/pokemon/";
const MAX_POKE_ID = 1010;

export const PokemonViewer = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pokemonName, setPokemonName] = useState<string[]>([]);

  const loadMorePokemon = () => {
    if (!loading) {
      setLoading(true);
      fetch(`${PokeApiUrl}?limit=10&offset=${(page - 1) * 20}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemonList([...pokemonList, ...data.results]);
          setLoading(false);
          setPage(page + 1);
        });
    }
  };

  useEffect(() => {
    loadMorePokemon();
  }, []);

  const pokemonJaName = (index) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}/`)
      .then((res) => res.json())
      .then((data) => data.names[9].name);
  };

  return (
    <div>
      {pokemonList.map((pokemon, index) => (
        <div key={index} className="flex flex-col">
          <Image width={200} height={200} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} alt="" />
          <h2>{pokemonJaName(index + 1)}</h2>
        </div>
      ))}
    </div>
  );
};
