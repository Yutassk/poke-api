import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

export const FavoritePoke = () => {
  const { uid } = useContext(AuthContext);
  const [favoritePoke, setFavoritePoke] = useState({
    num: 0,
    name: "",
  });

  useEffect(() => {
    if (uid) {
      const fetchFavorite = async () => {
        try {
          const usersRef = doc(db, "users", uid);
          const docSnap = (await getDoc(usersRef)).data()!;
          setFavoritePoke((prevData) => {
            return { ...prevData, num: docSnap.favorite };
          });

          // ポケモンの名前取得
          const fetchPokemonName = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${docSnap.favorite}/`);
          const fetchPokemonNameData = await fetchPokemonName.json();
          const japaneseName = fetchPokemonNameData.names.find((name: { language: { name: string } }) => name.language.name === "ja").name;
          setFavoritePoke((prevData) => {
            return { ...prevData, name: japaneseName };
          });
        } catch (e) {
          console.error("Error fetching results:", e);
          return [];
        }
      };
      fetchFavorite();
    }
  }, [uid]);
  return (
    <div>
      {favoritePoke.num > 0 && (
        <div className="border border-slate-200 shadow-md py-2">
          <div className="flex flex-col items-center relative">
            <h3 className="absolute top-0 left-2 text-xs">パートナーポケモン</h3>
            <Image width={200} height={200} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${favoritePoke.num}.png`} alt="" />
            <p>{favoritePoke.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};
