function Card({ data }) {
  return (
    <div>
      <img src="" alt="POKEMON" />
      <div>
        {data.map((pokeStats, index) => {
          return <div key={index}>{pokeStats.name}</div>;
        })}
      </div>
    </div>
  );
}

export default Card;
