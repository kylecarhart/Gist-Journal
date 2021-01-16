import React, { ReactElement, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as GithubLogo } from "../public/github.svg";

interface LoginProps {
  tryToken: (input: string) => {};
}

export function Login({ tryToken, ...props }: LoginProps): ReactElement {
  const [input, setInput] = useState("");

  return (
    <FlexWrapper>
      <StyledLogin {...props}>
        <GithubLogo />
        <h5>Sign in with Github</h5>
        <p style={{ margin: "0 0 3rem 0" }}>
          To log in, create a Personal Access Token for your account with gist
          permissions.
        </p>

        <Input
          placeholder="Enter token..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              tryToken(input);
            }
          }}
        />
        <Button
          onClick={() => {
            tryToken(input);
          }}
        >
          Sign in
        </Button>
      </StyledLogin>
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

const fadeIn = keyframes`
  from {
    transform: translate(0, -1rem);
    opacity: .4;
  }

  to {
    transform: translate(0, 0)
    opacity: 1;
  }
`;

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  width: 26rem;
  padding: 3rem 3.6rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const Input = styled.input`
  &::placeholder {
    color: #666;
  }
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.45rem;
  border-radius: 0.2rem;
  box-shadow: inset 0 1px 2px 0px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem 0;
  background: #8a63d2;
  border: 1px solid #6f42c1;
  color: #ffffff;
  border-radius: 0.2rem;

  &:hover {
    background: #6f42c1;
  }
`;

const GitLogo = styled.img`
  /* margin-top: 2rem; */
`;
