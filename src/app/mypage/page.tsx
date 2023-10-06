"use client";
import Link from "next/link";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SignInBtn from "../component/SignInBtn";
import { useState } from "react";
import { Record } from "../component/Record";

export default function Home() {
  const [logs, setLogs] = useState(false);

  const handleSetResult = () => {
    setLogs((prevLogs) => !prevLogs);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Header />
        <SignInBtn />
      </div>

      <div className="mx-4">
        <Link className="flex items-center justify-center space-x-2" href={"/quiz"}>
          <h3 className="text-3xl">マイページ</h3>
        </Link>
      </div>
      {logs ? (
        <div>
          <button onClick={handleSetResult}>記録を閉じる</button>
          <Record />
        </div>
      ) : (
        <div>
          <button onClick={handleSetResult}>過去の記録を表示する</button>
        </div>
      )}
      <Footer />
    </div>
  );
}