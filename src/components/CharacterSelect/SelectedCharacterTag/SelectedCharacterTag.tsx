import { Character } from "../../../types/Character";
import "./SelectedCharacterTag.scss";

interface SelectedCharacterTagProps {
  character: Character;
  selectedCharacters: Character[] | undefined;
  setSelectedCharacters: (characters: Character[] | undefined) => void;
}

const SelectedCharacterTag: React.FC<SelectedCharacterTagProps> = ({
  character,
  selectedCharacters,
  setSelectedCharacters,
}) => {
  const removeCharacter = (character: Character) => {
    setSelectedCharacters(
      selectedCharacters?.filter((char) => char.id !== character.id)
    );
  };

  return (
    <span className="selected-character">
      <span>{character.name}</span>
      <button
        className="selected-character__btn"
        onClick={() => removeCharacter(character)}
      >
        X
      </button>
    </span>
  );
};

export default SelectedCharacterTag;
