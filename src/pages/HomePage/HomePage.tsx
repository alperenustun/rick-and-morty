import CharacterSelect from "../../components/CharacterSelect/CharacterSelect";
import "./HomePage.scss";

const HomePage: React.FC = () => {
  return (
    <div className="homepage-main">
      <CharacterSelect />
    </div>
  );
};

export default HomePage;
