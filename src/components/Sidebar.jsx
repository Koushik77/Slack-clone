import React from "react";
import styled from "styled-components";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100vh;
  background-color: var(--slack-color);
  color: white;
  border-top: 1px solid #49274b;
`;

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 5px 0px;
    width: 100%;
    justify-content: space-between;

    > h2 {
        padding-left: 5px;
    }
`;

const SidebarSubHeader = styled.div``;

const SidebarChannels = styled.div``;

const SidebarDirectMessages = styled.div``;

const IconHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
    background-color: white;
    width: 11%;
    margin-right: 10px;
`;

function Sidebar() {
  return (
    <Container>
      <SidebarHeader>
        <h2>Portfolio Workshop</h2>
        <IconHolder>
            <CreateOutlinedIcon style={{color: "3f0f40", marginBottom: "2px"}}/>
        </IconHolder>
      </SidebarHeader>
      <SidebarSubHeader></SidebarSubHeader>
      <SidebarChannels></SidebarChannels>
      <SidebarDirectMessages></SidebarDirectMessages>
    </Container>
  );
}

export default Sidebar;
