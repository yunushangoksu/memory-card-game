import { useEffect, useState } from "react";
import Card from "./components/card";
import "./App.css";

function App() {
  const [pokemonFull, setPokemonFull] = useState([]);

  const fetchPokemon = async () => {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=10&offset=300"
    );
    const data = await res.json();

    function makeObject(pokeData) {
      pokeData.forEach(async (poke) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${poke.name}`
        );
        const data = await res.json();
        setPokemonFull((currentList) => [...currentList, data]);
      });
    }
    makeObject(data.results);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const checkLoaded = () => {
    if (pokemonFull.length == 10) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="wrapper">
      {checkLoaded() ? <Card pokemon={pokemonFull} /> : <>Loading...</>}
      <button onClick={() => console.log(pokemonFull)}>Buton</button>
    </div>
  );
}

export default App;
