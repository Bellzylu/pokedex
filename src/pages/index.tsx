import { Search } from "@/components/Search";
import { useEffect, useState } from "react";
import { capitalizeFirst } from "@/functions/text";
import { PokemonClient, type Pokemon } from "pokenode-ts";
import { type AxiosError } from "axios";
import { log } from "console";
import Image from "next/image";

const api = new PokemonClient();
const fallbackImage =
  "https://cdn.pixabay.com/photo/2023/02/16/03/47/eevee-7792958_1280.png";

function isAxiosError(error: unknown): error is AxiosError {
  return ((error as AxiosError)?.isAxiosError ?? false) === true;
}

async function fetchRandomPokemon() {
  const allPokemons = await api.listPokemons(0, 1);
  const totalPokemons = allPokemons.count;
  const randomId = Math.floor(Math.random() * totalPokemons) + 1;
  try {
    const pokemon = await api.getPokemonById(randomId);
    return pokemon;
  } catch (error) {
    if (isAxiosError(error)) {
      console.warn(error);
      return error;
    }
    console.warn("Unknown error: ", error);
    return null;
  }
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [error, setError] = useState<AxiosError>();

  async function handleSearch(term: string) {
    try {
      setError(undefined);
      const newPokemon = await api.getPokemonByName(term.toLowerCase());
      setPokemon(newPokemon);
    } catch (error) {
      if (isAxiosError(error)) setError(error);
      console.warn("Unhandled error");
      console.warn(error);
    }
  }

  async function handleRandomPokemon() {
    const response = await fetchRandomPokemon();

    if (isAxiosError(response)) {
      setError(response);
      return;
    }

    if (response === null) {
      console.warn("Unknown error: ", response);
      return;
    }

    setPokemon(response);
  }

  useEffect(() => {
    handleRandomPokemon();
  }, []);

  return (
    <main>
      {error !== undefined ? "😳" : null}
      {pokemon !== undefined ? (
        <div className="h-full w-full flex flex-col gap-3 items-center">
          <div className="w-full aspect-[2/1] flex justify-center items-center bg-[url(/poke-bg.jpeg)] bg-no-repeat bg-cover bg-bottom">
            <div className="drop-shadow-2xl">
              <Image
                alt={pokemon.name}
                src={pokemon.sprites.front_default ?? fallbackImage}
                height={250}
                width={250}
              />
            </div>
          </div>
          <Search className="bg-[#dee9e6]" onSubmit={handleSearch} />
          <div className="flex flex-col gap-3 container">
            <div className="flex gap-3 items-center">
              <span className="text-2xl font-bold text-gray-800">
                {capitalizeFirst(pokemon.name)}
              </span>
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="text-white bg-slate-700 py-1 px-3 shadow rounded-full">
                  {type.type.name}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 text-[10px]">
              {pokemon.moves.map((move) => (
                <div
                  key={move.move.name}
                  className="text-slate-800 bg-white py-1 px-3 shadow-sm rounded">
                  {move.move.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
