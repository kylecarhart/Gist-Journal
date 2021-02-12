import React, { ReactElement } from "react";
import styled from "styled-components";
import { Login } from "./components/login/Login";
import GistList from "./components/gist/GistList";
import { Switch, Route } from "react-router-dom";
import Journal from "./components/journal/Journal";
import NotFound from "./components/common/NotFound";

export default function App(): ReactElement {
  return (
    <AppWrapper>
      <Switch>
        <Route path="/token/:tokenId/gist/:gistId" component={Journal} />
        <Route path="/token/:tokenId" component={GistList} />
        <Route exact path="/" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  max-width: 64.286rem;
  margin: 5rem auto 0 auto;
`;
