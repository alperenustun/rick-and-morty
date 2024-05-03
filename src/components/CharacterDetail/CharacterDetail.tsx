import { Character } from "../../types/Character";
import "./CharacterDetail.scss";

interface CharacterDetailProps {
  character: Character;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
  return (
    <div className="character-detail-main">
      <h1>{character.name}</h1>
    </div>
  );
};

export default CharacterDetail;
