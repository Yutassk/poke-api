import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "./QuizProvider";

export const ResultRank = () => {
  const { score, exam } = useContext(QuizContext);

  const [ballName, setBallName] = useState("poke-ball");
  const [jaBallName, setJaBallName] = useState("モンスターボール");

  const correctRate = (score / exam) * 100;

  const correctScore = () => {
    if (correctRate > 74) {
      setBallName("master-ball");
      setJaBallName("マスターボール");
    } else if (correctRate > 49 && correctRate < 75) {
      setBallName("ultra-ball");
      setJaBallName("ハイパーボール");
    } else if (correctRate > 24 && correctRate < 50) {
      setBallName("great-ball");
      setJaBallName("スーパーボール");
    }
  };

  useEffect(() => {
    correctScore();
  });

  return (
    <div className="flex flex-col items-center space-y-2">
      <Image width={100} height={100} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${ballName}.png`} alt="" />
      <h2 className="text-xl font-bold">{`${jaBallName}級`}</h2>
    </div>
  );
};
