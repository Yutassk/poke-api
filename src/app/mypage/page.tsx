"use client";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useState } from "react";
import { Record } from "../component/Record";
import { FavoritePoke } from "../component/FavoritePoke";
import SignInBtn from "../component/SignInBtn";

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

      <div className="mx-6">
        <div className="mb-2">
          <h3 className="text-2xl">マイページ</h3>
        </div>
        <div>
          <FavoritePoke />
        </div>
        <div className="my-4">
          {logs ? (
            <div className="">
              <button className="bg-sky-600 text-white text-sm p-2 rounded-md" onClick={handleSetResult}>
                記録を閉じる
              </button>
              <Record />
            </div>
          ) : (
            <div>
              <button className="bg-sky-600 text-white text-sm p-2 rounded-md" onClick={handleSetResult}>
                過去の記録を表示する
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
