"use client";
import React, { useContext } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { QuizContext, QuizProvider } from "../component/QuizProvider";

const Result = () => {
  const { score, exam } = useContext(QuizContext);

  return (
    <div>
      <QuizProvider>
        <Header />
        <h2 className="text-3xl items-center text-center my-6">{`${exam}問中 : ${score}問正解！`} </h2>
        <Footer />
      </QuizProvider>
    </div>
  );
};

export default Result;
