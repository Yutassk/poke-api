"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizContext } from "./QuizProvider";

const GenerateRandomNum = () => {
  const router = useRouter();

  const { setScore, exam, setExam } = useContext(QuizContext);

  const [pokemonData, setPokemonData] = useState<{ name: string; num: number }[]>([]);
  const [answerNum, setAnswerNum] = useState<number>(0);
  const [checkNum, setCheckNum] = useState<null | number>(null);

  const fetchPokemonName = async (props: number) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props}/`);
      const data = await response.json();
      const japaneseName = data.names.find((name: { language: { name: string } }) => name.language.name === "ja").name;
      return japaneseName;
    } catch (error) {
      console.error("Error fetching Pokemon name:", error);
      return "";
    }
  };

  // 答え合わせ＆ラジオボタンリセット
  const checkAnswer = () => {
    if (answerNum === checkNum) {
      // alert("正解！");
      setScore((prevScore) => (prevScore += 1));
    } else {
      // alert("残念！");
    }
    setCheckNum(null);

    if (exam < 20) {
      setPokemonData([]);
      generateNextQuiz();
    } else {
      router.push("/result");
    }
  };

  const chooseAnswer = (index: number) => {
    setCheckNum(index);
  };

  // 回答後のメッセージを閉じると次の問題出題
  const generateNextQuiz = async () => {
    const newName: React.SetStateAction<{ name: string; num: number }[]> = [];
    const newAnswerNum = Math.floor(Math.random() * 4);

    setAnswerNum(newAnswerNum);

    while (newName.length < 4) {
      const randomNumber: number = Math.floor(1011 - Math.random() * 1010);
      const fetchName: string = await fetchPokemonName(randomNumber);

      if (fetchName && !newName.some((item) => item.num === randomNumber)) {
        newName.push({ name: fetchName, num: randomNumber });
      }
    }
    setPokemonData(newName);
    setExam((prevExam) => (prevExam += 1));
  };

  // 初期画面ロード時に問題出力
  useEffect(() => {
    setPokemonData([]);
    setAnswerNum(0);
    setExam(1);
    setScore(0);

    const generateChoicesNum = async () => {
      const newName: React.SetStateAction<{ name: string; num: number }[]> = [];
      const newAnswerNum = Math.floor(Math.random() * 4);

      setAnswerNum(newAnswerNum);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center border border-slate-200 mx-4 mb-2 shadow-md">
      <h2>{`${exam}問目`}</h2>
      <h3 className="my-3 text-lg">このポケモンの名前はなんでしょう。</h3>
      {pokemonData.length > 0 && (
        <Image width={250} height={250} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData[answerNum].num}.png`} alt="" />
      )}

      <div className="my-4">
        {pokemonData.map((fetchName, index) => (
          <div key={index} className="flex my-2 px-2 items-center text-lg rounded-md hover:bg-sky-100">
            <label className="cursor-pointer">
              <input type="radio" name="check" className="mr-2" onChange={() => chooseAnswer(index)} checked={index === checkNum} />
              {fetchName.name}
            </label>
          </div>
        ))}
      </div>
      <button
        className={`${checkNum === null ? "bg-gray-300 pointer-events-none" : "bg-rose-500"} text-white px-2 py-2 rounded-lg mb-4 hover:bg-rose-700 hover:translate-y-px hover:translate-x-px`}
        onClick={checkAnswer}
      >
        答えを送信する
      </button>
    </div>
  );
};

export default GenerateRandomNum;
