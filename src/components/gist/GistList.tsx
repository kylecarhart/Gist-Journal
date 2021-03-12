import React, { ReactElement, useState, useEffect } from "react";
import styled from "styled-components";
import GistAPI from "../../api/GistAPI";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { AuthenticationError } from "../../api/GithubAPI";
import { IGistSummary } from "../../api/gist.types";
import { getAllGistJournals } from "../journal/GistJournalAPI";

interface ParamTypes {
  tokenId: string;
}

export default function GistList({ ...props }): ReactElement {
  const { url } = useRouteMatch();
  const { tokenId } = useParams<ParamTypes>();
  const history = useHistory();

  const [gists, setGists] = useState<IGistSummary[] | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function _getAllGistJournals() {
      setGists(await getAllGistJournals(tokenId));
    }

    _getAllGistJournals();

    // GistAPI(tokenId)
    //   .getAllGists({
    //     page,
    //     per_page: 10,
    //   })
    //   .then((gists) => {
    //     gists = gists.filter((gist)=>gist.files.)
    //     setGists(gists);
    //   })
    //   .catch((e) => {
    //     if (e instanceof AuthenticationError) {
    //       history.push("/");
    //     }
    //   });
    return () => {};
  }, [tokenId, page, history]);

  return (
    <Container>
      <h2>Select a Gist:</h2>
      <StyledGistList>
        {gists?.map((gist) => (
          <GistListItem
            key={gist.id}
            onClick={() => {
              history.push(`${url}/gist/${gist.id}`);
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
  );
}

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
