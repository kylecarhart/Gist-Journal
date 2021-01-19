import React, { ReactElement, useContext, useState, useEffect } from "react";
import { Gist } from "../../api/types";
import styled from "styled-components";
import { TokenContext } from "../../App";
import GistAPI from "../../api/GistAPI";

interface Props {}

export default function GistList({ ...props }: Props): ReactElement {
  const token = useContext(TokenContext);
  const [gists, setGists] = useState([] as Gist[]);

  // useEffect(() => {
  //   GistAPI(token!)
  //     .getAllGists()
  //     .then((gists) => {
  //       setGists(gists);
  //     });
  //   return () => {};
  // }, [token]);

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
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  flex-direction: column;
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
  padding: 0.4rem 1rem;
  border-radius: 0.3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f5f5f5;
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
