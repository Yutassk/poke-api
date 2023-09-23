"use client";
import React, { useContext } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { QuizContext } from "../component/QuizProvider";
import { ResultRank } from "../component/ResultRank";
import { db } from "../component/Firebase";
import { addDoc, collection } from "firebase/firestore";

const Result = () => {
  const { score, exam } = useContext(QuizContext);

  const addResult = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Yuta",
        last: "Sasaki",
        born: 1815,
      });
      console.log("Document written with ID:", docRef.id);
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };

  return (
    <div>
      <Header />
      <ResultRank />
      <div className="text-center text-3xl my-6 space-y-4">
        <h2 className="">{`${exam}問中 : ${score}問正解！`} </h2>
      </div>
      <Footer />
      <button onClick={addResult}>koko</button>
    </div>
  );
};

export default Result;
