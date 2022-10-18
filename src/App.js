import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import styled from "styled-components";
import Spinner from "react-spinkit";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatBody from "./components/ChatBody";
import { auth } from "./firebase";
import Login from "./components/Login";

const AppContent = styled.div`
  display: flex;
  margin-top: 60px;
`;

const AppLoadingContainer = styled.div`
  display: grid;
  place-items: center;
  background-color: #f8f8f8;
  height: 100vh;
`;

const AppLoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    object-fit: contain;
    height: 200px;
    width: 200px;
  }
`;

function App() {
  const [user, loading] = useAuthState(auth);

  console.log("user info - ", { user });

  if (loading) {
    return (
      <AppLoadingContainer>
        <AppLoadingContent>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt="Slack logo"
          />

          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContent>
      </AppLoadingContainer>
    );
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppContent>
              <Sidebar></Sidebar>
              <Routes>
                <Route path="/" exact element={<ChatBody />} />
              </Routes>
            </AppContent>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
