import { useEffect, useState } from "react";
import Card from "./components/card";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [pokemonFull, setPokemonFull] = useState([]);
  const [pokemonDummy, setPokmeonDummy] = useState([]);

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
    setPokemonFull([]);

    makeObject(data.results);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const setShuffle = () => {
    setPokemonFull([]);
    setPokemonFull(shuffle(pokemonFull));
  };

  return (
    <div className="wrapper">
      <div className="scoreRow">Score: {score}</div>
      <div className="cardWrapper">
        {pokemonFull.map((data, index) => (
          <Card
            pokemon={data}
            pokemonSetter={setPokemonFull}
            sort={setShuffle}
            score={score}
            scoreSetter={setScore}
            fetch={fetchPokemon}
            key={index}
          />
        ))}
      </div>
      {/*       <button onClick={() => console.log(pokemonFull)}>Log</button>
      <button onClick={() => console.log(shuffle(pokemonFull))}>shuffle</button>
 */}
    </div>
  );
}

export default App;
