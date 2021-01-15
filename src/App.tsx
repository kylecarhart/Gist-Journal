import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { Gist } from "./gist/gist.types";
import { GistAPI } from "./gist/GistAPI";
import { Login } from "./login/Login";
import GistList from "./gist/GistList";
import JournalAPI, { isJournal } from "./journal/JournalAPI";

export default function App(): ReactElement {
  const [token, setToken] = useState<string | null>(null);
  const [gists, setGists] = useState<Gist[] | null>(null);
  const [selectedGist, setSelectedGist] = useState<Gist | null>(null);
  const [text, setText] = useState("");

  async function tryToken(input: string) {
    try {
      const res = await GistAPI(input).getAllGists();
      setGists(res);
      setToken(input);
    } catch (res) {
      if (res.status === 401) {
        alert(res.statusText);
      }
    }
  }

  async function selectGist(selectedGist: Gist) {
    try {
      const gist = await GistAPI(token!).getGist(selectedGist.id);
      if (isJournal(gist)) {
        setSelectedGist(gist);
        JournalAPI(token!).saveEntry(
          gist,
          "02",
          "05",
          "Text here!\nASDF!\nANOTHER"
        );
      }
    } catch (res) {
      alert(res.statusText);
    }
  }

  return (
    <AppWrapper>
      {!token && <Login tryToken={tryToken} />}
      {gists && <GistList gists={gists} selectGist={selectGist} />}
      {/* <div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <button
          onClick={() => {
            JournalAPI(token!).saveEntry(selectedGist!, "02", "05", text);
          }}
        >
          Click
        </button>
      </div> */}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  max-width: 64.286rem;
  height: 100vh;
  margin: 0 auto;
`;
