import Link from "next/link";
import GenerateRandomNum from "./component/GenerateRandomNum";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <h2>TOPぺーじ</h2>
      <Link href={"/quiz"}>
        <h3>クイズをはじめる</h3>
      </Link>
      <Footer />
    </div>
  );
}
