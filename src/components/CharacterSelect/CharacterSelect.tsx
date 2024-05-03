import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Character } from "../../types/Character";
import { getCharactersByName } from "../../api/characters";
import Loading from "../Loading/Loading";
import CharacterListItem from "./CharacterSelectItem/CharacterSelectItem";
import "./CharacterSelect.scss";

interface CharacterSelectProps {}

const CharacterSelect: React.FC<CharacterSelectProps> = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [debounceSearchInput] = useDebounce(searchInput, 500);

  const [selectedCharacters, setSelectedCharacters] = useState<Set<number>>();

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
    const newSelectedCharacters = new Set(selectedCharacters);
    if (newSelectedCharacters.has(character.id)) {
      newSelectedCharacters.delete(character.id);
    } else {
      newSelectedCharacters.add(character.id);
    }
    setSelectedCharacters(newSelectedCharacters);
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
        selected={selectedCharacters?.has(character.id) || false}
        onSelect={handleSelect}
      />
    ));
  };
  
  console.log(selectedCharacters);

  return (
    <div className="character-select">
      <div className="input-wrapper">
        <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
      </div>

      <div className="character-select__wrapper">{renderCharacterList()}</div>
    </div>
  );
};

export default CharacterSelect;
