import CharacterSelect from "../../components/CharacterSelect/CharacterSelect";
import "./HomePage.scss";

const HomePage: React.FC = () => {
  return (
    <div className="homepage-main">
      <div className="background-image"></div>
      <CharacterSelect />
    </div>
  );
};

export default HomePage;
