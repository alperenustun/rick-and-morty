import { Character } from "../../../types/Character";
import "./CharacterListItem.scss";

interface CharacterListItemProps {
  character: Character;
  selected: boolean;
  onSelect: (character: Character) => void;
  searchValue: string;
}

const CharacterListItem: React.FC<CharacterListItemProps> = ({
  character,
  selected,
  onSelect,
  searchValue
}) => {

  const nameParts = character.name.split(
    new RegExp(`(${searchValue})`, "gi") // Case-insensitive search
  );

  const characterName = nameParts.map((part: string) =>
    part.toLowerCase() === searchValue.toLowerCase() ? <b>{part}</b> : part
  );

  return (
    <li
      key={character.id}
      className={`${selected && "selected"} character-list-item`}
    >
      <input
        type="checkbox"
        className="character-list-item__select"
        defaultChecked={selected}
        onClick={() => onSelect(character)}
      />
      <img
        className="character-list-item__image"
        src={character.image}
        alt={character.name}
      />
      <div>
        <h3 className="character-list-item__title">{characterName}</h3>
        <p className="character-list-item__episodes">
          {character.episode.length} Episodes
        </p>
      </div>
    </li>
  );
};

export default CharacterListItem;
