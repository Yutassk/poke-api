"use client";
import React, { useContext } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { QuizContext } from "../component/QuizProvider";
import { ResultRank } from "../component/ResultRank";
import { addResult } from "../component/Firebase";
import Link from "next/link";
import { AuthContext } from "../component/AuthProvider";

const Result = () => {
  const { score, exam } = useContext(QuizContext);
  const { uid } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <ResultRank />
      <div className="text-center text-3xl my-6 space-y-4">
        <h2 className="">{`${exam}問中 : ${score}問正解！`} </h2>
      </div>
      <div className="flex justify-around my-4">
        <Link href={"/quiz"}>
          <button className="bg-rose-400 text-white rounded-md p-2">もう一度挑戦</button>
        </Link>
        <button className="bg-sky-500 text-white rounded-md p-2" onClick={() => addResult(score, exam, uid)}>
          結果を保存
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Result;
