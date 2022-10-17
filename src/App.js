import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const AppContent = styled.div``;

function App() {
  return (
    <div className="App">
      <Header />
      <AppContent>
        <Sidebar></Sidebar>

        <Router>
          <>
            <Routes>
              <Route path="/" exact element={<></>} />
            </Routes>
          </>
        </Router>
      </AppContent>
    </div>
  );
}

export default App;
