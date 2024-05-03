import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Character } from "../../types/Character";
import { getCharactersByName } from "../../api/characters";
import Loading from "../Loading/Loading";
import CharacterListItem from "./CharacterSelectItem/CharacterSelectItem";
import "./CharacterSelect.scss";
import SelectedCharacterTag from "./SelectedCharacterTag/SelectedCharacterTag";

interface CharacterSelectProps {}

const CharacterSelect: React.FC<CharacterSelectProps> = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [debounceSearchInput] = useDebounce(searchInput, 500);

  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: debounceSearchInput
      ? ["characters", debounceSearchInput]
      : ["characters"],
    queryFn: () => getCharactersByName(debounceSearchInput),
  });

  useEffect(() => {
    refetch();
  }, [debounceSearchInput]);

  const { results: characterList } = data?.data || {};

  const handleSelect = (character: Character) => {
    const isSelected = selectedCharacters?.some(
      (char) => char.id === character.id
    );
    if (isSelected) {
      const newSelectedCharacters = selectedCharacters?.filter(
        (char) => char.id !== character.id
      );
      setSelectedCharacters(newSelectedCharacters);
    } else {
      setSelectedCharacters(
        selectedCharacters ? [...selectedCharacters, character] : [character]
      );
    }
  };

  const axiosError = error as AxiosError;

  const renderCharacterList = () => {
    if (isPending) {
      return <Loading />;
    }

    if (error) {
      if (axiosError.response?.status === 404) {
        return <div className="error-container">No characters found</div>;
      }
      return <div className="error-container">Error: {error.message}</div>;
    }

    return characterList.map((character: Character) => (
      <CharacterListItem
        key={character.id}
        character={character}
        selected={
          (selectedCharacters &&
            selectedCharacters.some((char) => char.id === character.id)) ||
          false
        }
        onSelect={handleSelect}
      />
    ));
  };

  return (
    <div className="character-select">
      <div className="input-wrapper">
        {selectedCharacters?.map((character) => (
          <SelectedCharacterTag
            key={character.id}
            character={character}
            selectedCharacters={selectedCharacters}
            setSelectedCharacters={setSelectedCharacters}
          />
        ))}
        <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
      </div>

      <div className="character-select__wrapper">{renderCharacterList()}</div>
    </div>
  );
};

export default CharacterSelect;
