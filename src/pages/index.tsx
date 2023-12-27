import { Inter } from "next/font/google";
import "./../assets/pokeballs-bg.png";
import { Search } from "@/components/Search";
import Pokedex from "pokedex-promise-v2";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const P = new Pokedex();

export default function Home() {
  const [pokemon, setPopularPokemon] = useState([]);

  useEffect(() => {
    P.getPokemonByName(["eevee", "ditto"])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <main>
      <Search></Search>
      <h2></h2>
    </main>
  );
}
{
  /* */
}
