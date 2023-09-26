import Link from "next/link";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import SignInBtn from "./component/SignInBtn";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between">
        <Header />
        <SignInBtn />
      </div>
      <h2>TOPぺーじ</h2>
      <Link href={"/quiz"}>
        <h3>クイズをはじめる</h3>
      </Link>
      <Footer />
    </div>
  );
}
