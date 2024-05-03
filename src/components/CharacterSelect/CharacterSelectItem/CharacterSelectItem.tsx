import { Character } from "../../../types/Character";
import "./CharacterSelectItem.scss";

interface CharacterListItemProps {
  character: Character;
  selected: boolean;
  onSelect: (character: Character) => void;
}

const CharacterListItem: React.FC<CharacterListItemProps> = ({
  character,
  selected,
  onSelect,
}) => {
  return (
    <li
      key={character.id}
      className={`${selected && "selected"} character-list-item`}
    >
      <input
        type="checkbox"
        className="character-list-item__select"
        checked={selected ? true : false}
        onClick={() => onSelect(character)}
      />
      <img
        className="character-list-item__image"
        src={character.image}
        alt={character.name}
      />
      <div>
        <h3 className="character-list-item__title">{character.name}</h3>
        <p className="character-list-item__episodes">
          {character.episode.length} Episodes
        </p>
      </div>
    </li>
  );
};

export default CharacterListItem;
