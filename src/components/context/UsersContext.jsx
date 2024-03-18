import { useState, createContext } from "react";

// Create context with initial state and functions
export const GlobalUserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  user: {},
  setUser: () => {},
  token: {},
  setToken: () => {},
  facebook: {
    loginSuccess: () => {},
    loginFail: () => {},
    profileSuccess: () => {},
  },
});

// GlobalProvider component
// eslint-disable-next-line react/prop-types
const GlobalUserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state to null
  const [token, setToken] = useState(null); // Initialize user state to null
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }); //Initialize to user if found

  // Combine the state and functions into a single object
  const GlobalUserProviderValue = {
    user,
    setUser,
    token,
    setCurrentUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));

      setCurrentUser(user);
    },
    currentUser,
    setToken,
  };

  return (
    <GlobalUserContext.Provider value={GlobalUserProviderValue}>
      {children}
    </GlobalUserContext.Provider>
  );
};

export default GlobalUserProvider;
