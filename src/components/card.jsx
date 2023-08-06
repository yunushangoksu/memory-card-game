function Card({ pokemon }) {
  return (
    <div className="cardWrapper">
      {pokemon.map((res, index) => {
        return (
          <div key={index}>
            <img
              src={res.sprites.other["official-artwork"].front_default}
              alt={res.name}
              width={100}
            />
            <div>{res.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
