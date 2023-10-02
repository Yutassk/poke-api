import Link from "next/link";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import SignInBtn from "./component/SignInBtn";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Header />
        <SignInBtn />
      </div>

      <div className="group hover:bg-rose-300 transition-all duration-200 ease-linear">
        <Link className="flex items-center justify-center space-x-2" href={"/quiz"}>
          <Image className="group-hover:rotate-45 transition duration-1000 ease-in-out " src={"/pokeballicon.png"} width={100} height={100} alt="" />
          <h3 className="text-3xl">クイズをはじめる</h3>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
