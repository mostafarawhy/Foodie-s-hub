import { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { GlobalUserContext } from "./context/UsersContext";

// eslint-disable-next-line react/prop-types
const LoginButton = () => {
  const { setIsOpen } = useContext(GlobalContext);
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);

  return (
    <button
      className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1.5 rounded md:text-xsm md:py-2 md:px-4"
      onClick={() => {
        if (currentUser) {
          setCurrentUser(null);
        } else {
          setIsOpen(true);
        }
      }}
    >
      {currentUser ? "Sign Out" : "Sign In"}
    </button>
  );
};

export default LoginButton;
