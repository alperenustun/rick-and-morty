import { useParams } from "react-router-dom";
import "./CharacterDetailPage.scss";
import CharacterDetail from "../../components/CharacterDetail/CharacterDetail";
import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "../../api/characters";
import Loading from "../../components/Loading/Loading";

const CharacterDetailPage: React.FC = () => {
  const { characterId } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["singleCharacter"],
    queryFn: () => getCharacter(Number(characterId)),
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const {data: character} = data;

  return (
    <div className="detail-page-main">
      <div className="background-image"></div>
      <CharacterDetail character={character} />
    </div>
  );
};

export default CharacterDetailPage;
