import Link from "next/link";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Image from "next/image";
import SignInBtn from "./component/SignInBtn";
import FetchPokemon from "./component/FetchPokemon";

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Header />
        <SignInBtn />
      </div>

      <div>
        <div className="w-full m-auto">
          <div className="group hover:bg-rose-300 transition-all duration-200 ease-linear py-4 px-9">
            <Link className="flex items-center justify-between" href={"/quiz"}>
              <Image className="group-hover:animate-bounce" src={"/pokeballicon.png"} width={100} height={100} alt="" />
              <h3 className="text-3xl">クイズをはじめる</h3>
            </Link>
          </div>
          <div className="group hover:bg-green-300 transition-all duration-200 ease-linear py-4 px-9">
            <Link className="flex items-center justify-between" href={"/pokedex"}>
              <Image className="group-hover:animate-bounce" src={"/rotom.png"} width={100} height={100} alt="" />
              <h3 className="text-3xl">ポケモン図鑑</h3>
            </Link>
          </div>
        </div>
      </div>
      {/* <FetchPokemon /> */}
      <Footer />
    </div>
  );
}
