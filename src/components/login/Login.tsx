import React, { ReactElement, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthenticationError } from "../../api/GithubAPI";
import GithubAPI from "../../api/GithubAPI";
import { ReactComponent as GithubLogo } from "./github.svg";

export function Login({ ...props }): ReactElement {
  const [input, setInput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  async function signIn() {
    try {
      const scopes = await GithubAPI(input).getAuthScopes();

      // Make sure the token has access to gists
      if (scopes.includes("gist")) {
        history.push(`/token/${input}`);
      } else {
        setHasError(true);
        setErrorText("Token does not have gist permissions.");
      }
    } catch (e) {
      if (e instanceof AuthenticationError) {
        setHasError(true);
        setErrorText("Invalid token.");
      }
    }
  }

  return (
    <StyledLogin {...props}>
      <GithubLogo />
      <h5>Sign in with Github</h5>
      <p style={{ margin: "0 0 3rem 0" }}>
        Enter a Personal Access Token with Gist permissions.
      </p>

      <Label htmlFor="token">Personal Access Token</Label>
      <Input
        ref={inputRef}
        id="token"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            signIn();
          }
        }}
        hasError={hasError}
      />
      {hasError && <ErrorText>{errorText}</ErrorText>}
      <Button
        onClick={() => {
          signIn();
        }}
      >
        Sign in
      </Button>
      <HelpLink
        style={{ marginTop: ".5rem", fontSize: ".875rem" }}
        href="https://github.com/settings/tokens/new"
      >
        Create a token here
      </HelpLink>
    </StyledLogin>
  );
}

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
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  max-width: 26rem;
  padding: 3rem 3.6rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  animation: ${fadeIn} 0.8s cubic-bezier(0, 0.55, 0.45, 1) forwards;

  @media (max-width: 450px) {
    box-shadow: none;
  }
`;

const Label = styled.label`
  align-self: flex-start;
  font-size: 0.875rem;
  color: #666;
`;

interface InputProps {
  readonly hasError: boolean;
}

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 0.45rem;
  border-radius: 0.2rem;
  box-shadow: inset 0 1px 2px 0px rgba(0, 0, 0, 0.1);
  outline: 0;

  border: ${(props) =>
    props.hasError ? "1px solid #df0202" : "1px solid #ccc"};

  &:focus {
    box-shadow: ${(props) => (props.hasError ? "0 0 .25rem #df0202" : "")};
  }
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem 0;
  background: #63d2a3;
  border: 1px solid #5ac599;
  color: #ffffff;
  border-radius: 0.2rem;

  &:hover {
    background: #5ac599;
  }
`;

const HelpLink = styled.a`
  margin: 0.5rem 0 0 0;
  font-size: 0.875rem;
`;

const ErrorText = styled.span`
  font-size: 0.875rem;
  align-self: flex-start;
  color: #df0202;
`;
