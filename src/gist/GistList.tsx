import React, { ReactElement } from "react";
import { Gist } from "./gist.types";
import styled from "styled-components";

interface Props {
  gists: Gist[];
  selectGist: (gist: Gist) => {};
}

export default function GistList({ gists, selectGist }: Props): ReactElement {
  return (
    <FlexWrapper>
      <StyledGistList>
        {gists.map((gist) => (
          <GistListItem
            key={gist.id}
            onClick={() => {
              selectGist(gist);
            }}
          >
            <GistDescription>{gist.description}</GistDescription>
            <GistId>{gist.id.substr(0, 7)}</GistId>
          </GistListItem>
        ))}
      </StyledGistList>
    </FlexWrapper>
  );
}

const FlexWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledGistList = styled.ol`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 0;
  padding: 0;
`;

const GistListItem = styled.li`
  cursor: pointer;
  background: #ffffff;
  list-style: none;
  margin: 0 0 0.5rem 0;
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 0.3rem;

  &:hover {
    background: #f5f5f5;
  }
`;

const GistId = styled.span`
  background: #eee;
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem;
`;

const GistDescription = styled.span`
  margin: 0 0.5rem 0 0;
`;
