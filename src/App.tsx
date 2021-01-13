import React from "react";
import styled from "styled-components";
import { useGistAPI } from "./hooks/useGistAPI";

export default function App() {
  const GistAPI = useGistAPI(""); // NOTE: put PAT here

  async function handleClick() {
    const { files } = await GistAPI.get(""); // NOTE: put example gist id here
    for (const key in files) {
      if (Object.prototype.hasOwnProperty.call(files, key)) {
        const { content } = files[key];
        console.log(content);
      }
    }
  }

  return (
    <AppWrapper>
      <h1>This works!</h1>
      <button onClick={handleClick}>Click me, check logs.</button>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  max-width: 56.25rem;
  margin: 1rem auto 0 auto;
`;
