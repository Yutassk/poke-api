"use client";
import React, { useContext } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { QuizContext } from "./QuizProvider";

const Result = () => {
  const { score, exam } = useContext(QuizContext);

  return (
    <div>
      <Header />
      <h2>結果発表</h2>
      <h3>今回のクイズの結果は</h3>
      <h3>{`${exam}問中、${score}問正解！`} </h3>
      <Footer />
    </div>
  );
};

export default Result;
