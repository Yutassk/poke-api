"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const GenerateRandomNum = () => {
  const [pokemonData, setPokemonData] = useState<{ name: string; num: number }[]>([]);
  const [answerNum, setAnswerNum] = useState<number>(0);
  const [checkNum, setCheckNum] = useState(null);

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

  const checkAnswer = (check: number) => {
    if (answerNum === check) {
      alert("正解！");
    } else {
      alert("残念！");
    }
    generateNextQuiz();
  };

  // 回答後のメッセージを閉じると次の問題出題
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

  // 初期画面ロード時に問題出力
  useEffect(() => {
    const generateChoicesNum = async () => {
      const newAnswerNum = Math.floor(Math.random() * 4);
      setAnswerNum(newAnswerNum);

      const newName: React.SetStateAction<{ name: string; num: number }[]> = [];

      // 選択肢が４つになるまで、重複を避けてランダムな数字出力
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
    <div className="flex flex-col items-center border border-slate-200 mx-4 mb-6 shadow-md">
      {pokemonData.length > 0 && (
        <Image width={200} height={200} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData[answerNum].num}.png`} alt="" />
      )}

      <ul className="my-4">
        {pokemonData.map((fetchName, index) => (
          <li key={index} className="flex my-2 px-2 items-center text-lg cursor-pointer rounded-md hover:bg-sky-100">
            <input type="radio" name="check" onClick={() => checkAnswer(index)} />
            <p className="ml-2">{fetchName.name}</p>
          </li>
        ))}
      </ul>
      <button className="bg-rose-500 text-white px-2 py-2 rounded-lg mb-4 hover:bg-rose-700 hover:translate-y-px hover:translate-x-px">答えを送信する</button>
    </div>
  );
};

export default GenerateRandomNum;
