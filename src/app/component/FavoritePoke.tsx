import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { db } from "./Firebase";
import { collection, doc, getDocs, query } from "firebase/firestore";

export const FavoritePoke = () => {
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    if (uid) {
      const fetchFavorite = async () => {
        const usersRef = collection(db, "users");
        const userDocRef = doc(usersRef, uid);
        const favoriteRef = collection(userDocRef, "favorite");

        try {
          const q = query(favoriteRef);
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(data.favorite);
          });
          //   setRecords(updatedRecord);
        } catch (e) {
          console.error("Error fetching results:", e);
          return [];
        }
      };
      fetchFavorite();
    }
  }, [uid]);
  return <div>FavoritePoke</div>;
};
