import { Link } from "react-router-dom";
import { Character } from "../../../types/Character";
import "./CharacterListItem.scss";
import { useEffect, useRef } from "react";

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
  searchValue,
}) => {
  const nameParts = character.name.split(
    new RegExp(`(${searchValue})`, "gi") // Case-insensitive search
  );

  const characterName = nameParts.map((part: string, index: number) =>
    part.toLowerCase() === searchValue.toLowerCase() ? (
      <b key={index}>{part}</b>
    ) : (
      part
    )
  );

  const listItemRef = useRef<HTMLLIElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Enter") {
      onSelect(character);
    } else if (event.key === "ArrowDown" || event.key === "Tab") {
      const nextItem = listItemRef.current?.nextElementSibling;
      if (nextItem instanceof HTMLLIElement) {
        nextItem.focus();
      }
    } else if (event.key === "ArrowUp" && event.shiftKey) {
      onSelect(character);
    } else if (event.key === "ArrowUp") {
      const previousItem = listItemRef.current?.previousElementSibling;
      if (previousItem instanceof HTMLLIElement) {
        previousItem.focus();
      }
    }
  };

  useEffect(() => {
    const listItem = listItemRef.current;
    if (listItem && selected) {
      listItem.focus();
    }
  }, [selected]);

  return (
    <li
      key={character.id}
      className={`${selected && "selected"} character-list-item`}
      tabIndex={selected ? 0 : -1}
      ref={listItemRef}
      onKeyDown={handleKeyDown}
    >
      <input
        type="checkbox"
        className="character-list-item__select"
        checked={selected}
        onChange={() => onSelect(character)}
      />
      <Link to={`/characters/${character.id}`}>
        <img
          className="character-list-item__image"
          src={character.image}
          alt={character.name}
        />
      </Link>
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
