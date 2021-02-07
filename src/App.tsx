import React, { ReactElement } from "react";
import styled from "styled-components";
import { Login } from "./components/login/Login";
import GistList from "./components/gist/GistList";
import { Switch, Route, Redirect } from "react-router-dom";

export default function App(): ReactElement {
  return (
    <AppWrapper>
      <Switch>
        <Route path="/token/:tokenId/gist/:gistId">
          <div>This works great! I think.</div>
        </Route>
        <Route path="/token/:tokenId">
          <GistList />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route>
          <div>Bad link</div>
        </Route>
      </Switch>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  max-width: 64.286rem;
  margin: 5rem auto 0 auto;
`;
