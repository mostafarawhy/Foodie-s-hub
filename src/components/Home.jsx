import LoginModal from "./LoginModal";
import NavBar from "./NavBar";
import GlobalProvider from "./context/GlobalState";
import ToggleMenu from "./ToggleMenu";

const Home = () => {
  return (
    <GlobalProvider>
      <NavBar />
      <LoginModal />
      <ToggleMenu />
    </GlobalProvider>
  );
};

export default Home;
