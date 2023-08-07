/* eslint-disable react/prop-types */
import { useState } from "react";

function Card({ pokemon, sort, fetch, score, scoreSetter }) {
  const [isUsed, setIsUsed] = useState(false);

  const resetGame = () => {
    alert(`Failed! Your final score: ${score}`);
    fetch();
    sort();
    scoreSetter(0);
  };

  return (
    <div
      className="singleCard"
      onClick={() => {
        if (isUsed == false) {
          setIsUsed(true);
          scoreSetter(score + 1);
          console.log(isUsed);
        } else {
          resetGame();
        }
      }}
    >
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        width={100}
      />
      <div className="cardText">{pokemon.name}</div>
    </div>
  );
}

export default Card;
