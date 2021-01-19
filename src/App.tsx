import React, { createContext, ReactElement, useState } from "react";
import styled from "styled-components";
import { Login } from "./components/login/Login";
import GistList from "./components/gist/GistList";

type TokenState = string | null;

export const TokenContext = createContext<TokenState>(null);

export default function App(): ReactElement {
  const [token, setToken] = useState<TokenState>(null);

  return (
    <AppWrapper>
      {!token && (
        <Login
          setToken={(input) => {
            setToken(input);
          }}
        />
      )}
      <TokenContext.Provider value={token}>
        {token && <GistList />}
      </TokenContext.Provider>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  max-width: 64.286rem;
  height: 100vh;
  margin: 0 auto;
`;
