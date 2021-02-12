import React, { ReactElement } from "react";
import styled from "styled-components";
import { Login } from "./components/login/Login";
import GistList from "./components/gist/GistList";
import { Switch, Route } from "react-router-dom";
import Journal from "./components/journal/Journal";
import NotFound from "./components/common/NotFound";

// 9549c62f8ab756fadae7a86a9ec46e4cda362e1b - nothing
// 0cc0eb55ed15649337965783462a8ca58e943c5b - gists

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
