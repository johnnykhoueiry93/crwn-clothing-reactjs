import { createContext, useState } from "react";

// the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// the provider is the actual component
// this will wrapp App and allow any component to call this children which
// will be the user captured on sign up or sign it
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
