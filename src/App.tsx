import React, { useState } from "react";
import styled from "styled-components";
import { Gist } from "./gist/gist.types";
import { GistAPI } from "./gist/GistAPI";

export default function App() {
  const gistAPI = GistAPI(""); // NOTE: put PAT here
  const [gist, setGist] = useState<Gist | null>(null);

  async function createGist() {
    let res = await gistAPI.createGist({
      description: "Journal 2020",
      public: false,
      files: {
        "yikes.md": { content: "This was just created" },
      },
    });
    setGist(res);
    console.log(res);
  }

  async function getGist() {
    let res = await gistAPI.getGist("");
    console.log(res);
  }

  async function updateGist() {
    if (gist) {
      let res = await gistAPI.updateGist(gist.id, {
        files: {
          "yikes.md": { content: "again" },
        },
      });
      console.log(res);
    }
  }

  async function deleteGist() {
    if (gist) {
      let res = await gistAPI.deleteGist(gist.id);
      console.log(res);
    }
  }

  return (
    <AppWrapper>
      <h1>This works!</h1>
      <button onClick={createGist}>Create Gist</button>
      <button onClick={getGist}>Get Gist</button>
      <button onClick={updateGist}>Update Gist</button>
      <button onClick={deleteGist}>Delete Gist</button>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  max-width: 56.25rem;
  margin: 1rem auto 0 auto;
`;
