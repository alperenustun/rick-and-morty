import { api } from "./index";

const getCharacters = async (pageNumber: number = 1) => {
  return api.get(`/character?page=${pageNumber.toString()}`);
};

const getCharacter = async (characterId: number) => {
  return api.get(`/character/${characterId}`);
};

const getCharactersByName = async (characterName: string) => {
  return api.get(`/character/?name=${characterName}`);
};

export { getCharacters, getCharacter, getCharactersByName };
