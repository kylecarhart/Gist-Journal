import React, { ReactElement, useContext, useState, useEffect } from "react";
import { Gist } from "../../api/types";
import styled from "styled-components";
import { TokenContext } from "../../App";
import GistAPI from "../../api/GistAPI";

interface Props {}

export default function GistList({ ...props }: Props): ReactElement {
  const token = useContext(TokenContext);
  const [gists, setGists] = useState([] as Gist[]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    GistAPI(token!)
      .getAllGists({
        page,
        per_page: 10,
      })
      .then((gists) => {
        setGists(gists);
      });
    return () => {};
  }, [token, page]);

  return (
    <FlexWrapper>
      <Container>
        <h2>Select a Gist:</h2>
        <StyledGistList>
          {gists.map((gist) => (
            <GistListItem
              key={gist.id}
              onClick={() => {
                // selectGist(gist);
              }}
            >
              <div>
                <Description>{gist.description}</Description>
                <GistId>{gist.id.substr(0, 7)}</GistId>
              </div>
              <Button>Delete</Button>
            </GistListItem>
          ))}
        </StyledGistList>
      </Container>
    </FlexWrapper>
  );
}

const FlexWrapper = styled.div`
  /* width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center; */
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const StyledGistList = styled.ol`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background: #f4f4f4;
  box-shadow: inset 0px 2px 3px rgba(0, 0, 0, 0.03);

  margin: 0;
  padding: 2rem;
`;

const GistListItem = styled.li`
  cursor: pointer;
  list-style: none;
  padding: 0.4rem 1rem;
  border-radius: 0.3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #e9e9e9;
  }
`;

const GistId = styled.span`
  background: #eee;
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem;
`;

const Description = styled.span`
  margin: 0 0.5rem 0 0;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  background: #8a63d2;
  color: #ffffff;
  border: 1px solid #8a63d2;
  border-radius: 0.2rem;
`;
