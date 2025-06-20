"use client";

import React, { useEffect, useState } from "react";

interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: string[];
}

export default function ApiThree() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState<string>("");

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/episode")
      .then((res) => res.json())
      .then((data) => {
        setEpisodes(data.results);
        setLoading(false);
      });
  }, []);

  // Cambia la imagen cada vez que cambia el episodio
  useEffect(() => {
    if (episodes.length > 0) {
      const characterUrl = episodes[current].characters[0];
      fetch(characterUrl)
        .then((res) => res.json())
        .then((data) => setImg(data.image));
    }
  }, [current, episodes]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? episodes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === episodes.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrent(Number(e.target.value));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-3xl mx-auto flex justify-center items-center">
        <p className="text-gray-500">Cargando episodios...</p>
      </div>
    );
  }

  if (!episodes.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-3xl mx-auto flex justify-center items-center">
        <p className="text-red-500">No se encontraron episodios.</p>
      </div>
    );
  }

  const episode = episodes[current];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl mx-auto flex flex-col items-center">
      <h3 className="text-xl font-bold mb-4 text-center">Episodio de Rick y Morty</h3>
      {img && (
        <img
          src={img}
          alt="Personaje del episodio"
          className="w-64 h-40 object-cover rounded-lg mb-4 shadow"
        />
      )}
      <div className="flex items-center gap-4 w-full mb-4">
        <button
          onClick={handlePrev}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-xl"
          aria-label="Anterior"
        >
          &#8592;
        </button>
        <select
          value={current}
          onChange={handleSelect}
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        >
          {episodes.map((ep, idx) => (
            <option key={ep.id} value={idx}>
              {ep.episode} - {ep.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleNext}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-xl"
          aria-label="Siguiente"
        >
          &#8594;
        </button>
      </div>
      <div className="w-full text-center">
        <h4 className="font-semibold text-lg mb-1">{episode.name}</h4>
        <p className="text-gray-600 mb-1">{episode.episode}</p>
        <p className="text-gray-500 text-sm">Emitido: {episode.air_date}</p>
      </div>
    </div>
  );
}