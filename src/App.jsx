import { useEffect, useState } from "react";
import Card from "./components/card";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [pokemonFull, setPokemonFull] = useState([]);
  const [pokemonDummy, setPokmeonDummy] = useState([]);

  const fetchPokemon = async () => {
    setPokemonFull([]);
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
      setPokmeonDummy(pokemonFull);
      let sorted = pokemonDummy.sort(() => 0.5 - Math.random());
      setPokemonFull([]);
      setPokemonFull(sorted);
      setPokmeonDummy([]);
    } else {
      console.log("error");
    }
  };

  return (
    <div className="wrapper">
      <div className="scoreRow">Score: {score}</div>
      <div className="cardWrapper">
        {pokemonFull.map((data, index) => (
          <Card
            pokemon={data}
            pokemonSetter={setPokemonFull}
            sort={checkLoaded}
            score={score}
            scoreSetter={setScore}
            fetch={fetchPokemon}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
