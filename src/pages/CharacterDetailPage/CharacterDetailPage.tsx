import { useParams } from "react-router-dom";
import "./CharacterDetailPage.scss";

const CharacterDetailPage: React.FC = () => {
  const { characterId } = useParams();
  console.log(characterId);

  return (
    <div className="character-detail-page">
      <h1>Character Detail Page</h1>
    </div>
  );
};

export default CharacterDetailPage;
