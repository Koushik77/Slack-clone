import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SidebarOpts from "./SidebarOpts";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { getRooms } from "../firestore-crud";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "../firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100vh;
  background-color: var(--slack-color);
  color: white;
  border-top: 1px solid #49274b;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 5px 0px;
  width: 100%;
  justify-content: space-between;

  > h2 {
    padding-left: 5px;
    font-size: 16px;
  }
`;

const SidebarSubHeader = styled.div``;

const SidebarChannels = styled.div``;

const SidebarDirectMessages = styled.div``;

const IconHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

function Sidebar() {
  const [showChannels, setShowChannels] = useState(true);
  const [showTopOptions, setShowTopOptions] = useState(true);
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "rooms"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <Container>
      <SidebarHeader>
        <h2>Portfolio Workshop</h2>
        <IconHolder>
          <CreateOutlinedIcon
            style={{ color: "3f0f40", marginBottom: "2px", padding: "4px" }}
          />
        </IconHolder>
      </SidebarHeader>
      <SidebarOpts Icon={InsertCommentIcon} title="Threads" />
      <SidebarOpts Icon={InboxIcon} title="Messages and mentions" />
      {showTopOptions ? (
        <>
          <SidebarOpts Icon={DraftsIcon} title="Saved items" />
          <SidebarOpts Icon={BookmarkBorderIcon} title="Channel browser" />
          <SidebarOpts Icon={PeopleAltIcon} title="People & user groups" />
          <SidebarOpts Icon={AppsIcon} title="Apps" />
          <SidebarOpts Icon={FileCopyIcon} title="File browser" />
          <SidebarOpts
            Icon={ExpandLessIcon}
            title="Show less"
            setShowOptions={setShowTopOptions}
          />
        </>
      ) : (
        <SidebarOpts
          Icon={ExpandMoreIcon}
          title="Show more"
          setShowOptions={setShowTopOptions}
        />
      )}
      <hr />
      <SidebarOpts
        Icon={showChannels ? ExpandMoreIcon : ExpandLessIcon}
        title="Channels"
        toggleChannels={() => setShowChannels(!showChannels)}
      />
      {showChannels &&
        value &&
        value.docs.map((doc) => (
          <SidebarOpts key={doc.id} title={doc.data().name} id={doc.id}/>
        ))}
      <hr />
      <SidebarOpts Icon={AddIcon} title="Add channel" />
      <SidebarSubHeader></SidebarSubHeader>
      <SidebarChannels></SidebarChannels>
      <SidebarDirectMessages></SidebarDirectMessages>
    </Container>
  );
}

export default Sidebar;
