import React from "react";

const Pokedex = () => {
  const fetchPokemonName = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/1/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Pokemon name:", error);
      return "";
    }
  };

  return <div>Pokedex</div>;
};

export default Pokedex;