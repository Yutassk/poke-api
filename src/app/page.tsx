import Link from "next/link";
import GenerateRandomNum from "./component/GenerateRandomNum";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import SigninBtn from "./component/SigninBtn";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between">
        <Header />
        <SigninBtn />
      </div>
      <h2>TOPぺーじ</h2>
      <Link href={"/quiz"}>
        <h3>クイズをはじめる</h3>
      </Link>
      <Footer />
    </div>
  );
}
