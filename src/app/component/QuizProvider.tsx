"use client";
import React, { FC, ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type QuizType = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  exam: number;
  setExam: React.Dispatch<React.SetStateAction<number>>;
};

// export const QuizContext = createContext(0);
export const QuizContext = createContext<QuizType>({
  score: 0,
  setScore: () => {},
  exam: 0,
  setExam: () => {},
});

export const QuizProvider: FC<Props> = (props) => {
  const { children } = props;

  const [score, setScore] = useState<number>(0);
  const [exam, setExam] = useState<number>(0);

  const contextValue = {
    score,
    setScore,
    exam,
    setExam,
  };

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};
