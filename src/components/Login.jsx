import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const LoginPage = styled.div`
  display: grid;
  place-items: center;
  background-color: #f8f8f8;
  height: 100vh;
`;

const LogoContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 200px;
    width: 200px;
  }

  > button {
    margin-top: 20px;
    text-transform: none;
    background-color: green;
    color: white;

    :hover {
      background-color: green;
      opacity: 0.9;
    }
  }
`;

function Login() {
  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .catch((error) => {
        alert(error.message);
      });
  };


  return (
    <LoginPage>
      <LogoContainer>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt="Slack logo"
        />
        <h1>Sign in to Portfolio Workshop</h1>
        <p>https://portfolio-workshop-hq.slack.com</p>

        <Button onClick={handleSignIn}>Sign in with Google</Button>
      </LogoContainer>
    </LoginPage>
  );
}

export default Login;
