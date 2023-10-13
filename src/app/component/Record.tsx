"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./Firebase";
import { ResultRank } from "./ResultRank";

export const Record = () => {
  const { uid } = useContext(AuthContext);
  const [records, setRecords] = useState([
    {
      id: "",
      date: "",
      exam: 0,
      score: 0,
    },
  ]);

  useEffect(() => {
    if (uid) {
      const fetchResults = async () => {
        const usersRef = collection(db, "users");
        const userDocRef = doc(usersRef, uid);
        const resultRef = collection(userDocRef, "results");

        try {
          const q = query(resultRef, orderBy("date", "desc"));
          const querySnapshot = await getDocs(q);

          const updatedRecord: any = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const month = data.date.toDate().getMonth() + 1;
            const day = data.date.toDate().getDate();

            updatedRecord.push({
              id: doc.id,
              date: `${month}月${day}日`,
              exam: data.exam,
              score: data.score,
            });
          });
          setRecords(updatedRecord);
        } catch (e) {
          console.error("Error fetching results:", e);
          return [];
        }
      };
      fetchResults();
    }
  }, [uid]);

  return (
    <div>
      {records.map((item) => (
        <div className="relative border border-l-slate-200 p-6 my-3" key={item.id}>
          <div className="flex items-center justify-around flex-row-reverse mb-4">
            <ResultRank score={item.score} exam={item.exam} />
            <div className="text-xl space-y-2">
              <p>Exam: {item.exam}</p>
              <p>Score: {item.score}</p>
            </div>
          </div>
          <p className="absolute top-2 left-2">{item.date}</p>
        </div>
      ))}
      <div></div>
    </div>
  );
};
