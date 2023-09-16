"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const GenerateRandomNum = () => {
  const [pokemonData, setPokemonData] = useState<{ name: string; num: number }[]>([]);
  const [answerNum, setAnswerNum] = useState<number>(0);

  const fetchPokemonName = async (props: number) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props}/`);
      const data = await response.json();
      const japaneseName = data.names.find((name) => name.language.name === "ja").name;
      return japaneseName;
    } catch (error) {
      console.error("Error fetching Pokemon name:", error);
      return "";
    }
  };

  const checkAnswer = (check) => {
    console.log(answerNum, check);
    if (answerNum === check) {
      alert("正解！");
    } else {
      alert("残念！");
    }
    generateNextQuiz();
  };

  const generateNextQuiz = async () => {
    const newAnswerNum = Math.floor(Math.random() * 4);
    setAnswerNum(newAnswerNum);

    const newName: React.SetStateAction<{ name: string; num: number }[]> = [];

    while (newName.length < 4) {
      const randomNumber: number = Math.floor(1011 - Math.random() * 1010);
      const fetchName: string = await fetchPokemonName(randomNumber);

      if (fetchName && !newName.some((item) => item.num === randomNumber)) {
        newName.push({ name: fetchName, num: randomNumber });
      }
    }
    setPokemonData(newName);
  };

  useEffect(() => {
    const generateChoicesNum = async () => {
      const newAnswerNum = Math.floor(Math.random() * 4);
      setAnswerNum(newAnswerNum);

      const newName: React.SetStateAction<{ name: string; num: number }[]> = [];

      while (newName.length < 4) {
        const randomNumber: number = Math.floor(1011 - Math.random() * 1010);
        const fetchName: string = await fetchPokemonName(randomNumber);

        if (fetchName && !newName.some((item) => item.num === randomNumber)) {
          newName.push({ name: fetchName, num: randomNumber });
        }
      }
      setPokemonData(newName);
    };
    generateChoicesNum();
  }, []);

  return (
    <div className="flex flex-col items-center border border-slate-200 mx-4">
      {pokemonData.length > 0 && (
        <Image width={200} height={200} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData[answerNum].num}.png`} alt="" />
      )}

      <ul>
        {pokemonData.map((fetchName, index) => (
          <li key={index} className="flex my-2 items-center">
            <input type="radio" name="check" onClick={(e) => checkAnswer(index)} />
            <p>{fetchName.name}</p>
          </li>
        ))}
        <button className="bg-rose-500 text-white px-2 py-2 rounded-lg">答えを送信する</button>
      </ul>
    </div>
  );
};

export default GenerateRandomNum;
