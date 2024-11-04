import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import authenticationService from "../services/authentication.service";

const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function authenticate() {
    setLoading(true);
    const [ok, data] = await authenticationService.authenticate();
    setLoading(false);
    updateAuthentication(ok, data?.user);
  }

  useEffect(() => {
    function handleNotAuthenticated() {
      updateAuthentication(false);
    }

    document.addEventListener("not-authenticated", handleNotAuthenticated);

    authenticate();

    return () => {
      document.removeEventListener("not-authenticated", handleNotAuthenticated);
    };
  }, []);

  function updateAuthentication(authenticated, user) {
    setAuthenticated(authenticated);

    if (authenticated) setUser(user);
    else setUser(null);
  }

  return (
    <MainContext.Provider
      value={{
        authenticated,
        user,
        loading,
        updateAuthentication,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}
