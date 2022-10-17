import React from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, getFirestore, orderBy } from "firebase/firestore";
import { app } from "../firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100vh;
  background-color: #f3f2f2;
  color: #000;
  border-top: 1px solid #49274b;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

function ChatBody() {
  const roomId = useSelector(selectRoomId);
  console.log({ roomId });
  const [roomDetails] = useDocument(
    roomId && doc(getFirestore(app), "rooms", roomId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [messageDetails] = useCollection(
    roomId && collection(getFirestore(app), "rooms", roomId, "messages"),
    orderBy("timestamp", "asc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  if (roomDetails) {
    console.log(roomDetails.data());
  }
  if (messageDetails) {
    messageDetails.docs.map((doc) => console.log(doc.data()));
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h4>
            <strong>{roomDetails && `#${roomDetails.data().name}`}</strong>
          </h4>
          <StarBorderOutlinedIcon />
        </HeaderLeft>
        <HeaderRight>
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </HeaderRight>
      </Header>
      <ChatMessages>
        {messageDetails && messageDetails.docs.map((doc) => (
          <p key={doc.id}>{doc.data().content}</p>
        ))}
      </ChatMessages>
      <ChatInput
        //channelName
        channelId={roomId}
      ></ChatInput>
    </Container>
  );
}

export default ChatBody;
