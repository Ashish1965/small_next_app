import Image from 'next/image';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="card">
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={150}
        height={150}
      />
      <h2>{pokemon.name}</h2>
    </div>
  );
};

export default PokemonCard;