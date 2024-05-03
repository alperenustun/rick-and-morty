import CharacterDetailPage from "./pages/CharacterDetailPage/CharacterDetailPage";
import HomePage from "./pages/HomePage/HomePage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/characters/:characterId",
    element: <CharacterDetailPage />
  }
];

export default routes;
