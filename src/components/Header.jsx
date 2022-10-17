import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Container = styled.div`
  display: flex;
  background-color: var(--slack-color);
  color: white;
  padding: 10px;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #49274b;
`;

const HeaderLeft = styled.div`
  display: flex;
  width: 25%;
  align-items: center;
  justify-content: space-between;
`;

const HeaderSearch = styled.div`
  width: 50%;
  display: flex;
  margin-left: 15px;
  border: 1px solid gray;
  border-radius: 6px;
  text-align: center;
  background-color: #421f44;

  > input {
    width: 90%;
    background-color: transparent;
    text-align: center;
    border: none;
    color: white;
    outline: none;
  }
`;

const HeaderRight = styled.div`
  width: 25%;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`;

const HeaderIcon = styled(Avatar)`
  cursor: pointer;
  margin-left: 15px;

  :hover {
    opacity: 0.8;
  }
`;

function Header() {
  return (
    <Container>
      <HeaderLeft>
        <HeaderIcon />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search people,channels,teams..."/>
      </HeaderSearch>
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </Container>
  );
}

export default Header;
