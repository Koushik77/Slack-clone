import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatBody from "./components/ChatBody";

const AppContent = styled.div`
  display: flex;
  margin-top: 60px;
`;

function App() {
  return (
    <div className="App">
      <Header />
      <AppContent>
        <Sidebar></Sidebar>
        <Router>
          <Routes>
            <Route path="/" exact element={<ChatBody />} />
          </Routes>
        </Router>
      </AppContent>
    </div>
  );
}

export default App;
