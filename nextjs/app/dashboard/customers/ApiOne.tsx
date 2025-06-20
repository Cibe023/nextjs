"use client";

import React, { useEffect, useState } from "react";

interface Ability {
  ability: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: Ability[];
}

export default function ApiOne() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("pikachu");
  const [error, setError] = useState("");

  const fetchPokemon = (name: string) => {
    setLoading(true);
    setError("");
    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(() => {
        setPokemon(null);
        setLoading(false);
        setError("Pokémon no encontrado");
      });
  };

  useEffect(() => {
    fetchPokemon(search);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPokemon(search);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca un Pokémon (ej: bulbasaur)"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
        >
          Buscar
        </button>
      </form>
      {loading ? (
        <p className="text-gray-500">Cargando Pokémon...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : pokemon ? (
        <>
          <h3 className="text-2xl font-bold mb-2 capitalize">
            {pokemon.name}
          </h3>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 mb-4 drop-shadow"
          />
          <div className="w-full">
            <h4 className="font-semibold mb-1">Habilidades:</h4>
            <ul className="list-disc list-inside mb-2">
              {pokemon.abilities.map((ab, idx) => (
                <li key={idx} className="capitalize">
                  {ab.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}