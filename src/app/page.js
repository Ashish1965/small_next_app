"use client"

import Image from "next/image";



import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from "@/components/PokemonCard";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = [];
      for (let i = 1; i <= 50; i++) {
        promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }
      const responses = await Promise.all(promises);
      const data = responses.map((response) => response.data);
      setPokemons(data);
      setFilteredPokemons(data);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemons]);

  return (
    <div className="container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
