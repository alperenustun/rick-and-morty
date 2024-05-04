import { Character } from "../../types/Character";
import "./CharacterDetail.scss";

interface CharacterDetailProps {
  character: Character;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
  return (
    <div className="character-detail">
      <img className="character-detail__image" src={character.image} />
      <div className="detail-right-column">
        <h1 className="character-detail__title">{character.name}</h1>
        <p className="character-detail__description">
          <b>Gender:</b> {character.gender}
        </p>
        <p className="character-detail__description">
          <b>Location:</b> {character.location.name}
        </p>
        <p className="character-detail__description">
          <b>Species:</b> {character.species}
        </p>
        <p className="character-detail__description">
          <b>Status:</b> {character.status}
        </p>
      </div>
    </div>
  );
};

export default CharacterDetail;
