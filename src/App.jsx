import "./reset.css";
import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/card";

function App() {
  const [pokeData, setPokeData] = useState([]);

  const fetchPokeData = async () => {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=100")
      .then((res) => res.json())
      .then((data) => setPokeData(...pokeData, data.results))
      .catch((error) => {
        console.log("Bir hata oluştu : ", error);
      });
  };

  useEffect(() => {
    fetchPokeData();
  }, []);

  const checkLoaded = () => {
    if (pokeData.length == 10) {
      return true;
    } else {
      return false;
    }
  };

  console.log(checkLoaded());

  return (
    <>
      <div>Merhaba</div>

      {checkLoaded() ? <Card data={pokeData} /> : <>Loading...</>}

      <button onClick={() => console.log(pokeData)}>log</button>
    </>
  );
}

export default App;
