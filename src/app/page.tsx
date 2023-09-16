import { useEffect } from "react";
import GenerateRandomNum from "./component/GenerateRandomNum";
import { PokemonViewer } from "./component/PokeApi";

export default function Home() {
  return (
    <div>
      <GenerateRandomNum />
    </div>
  );
}
