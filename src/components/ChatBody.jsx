import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, getFirestore, orderBy } from "firebase/firestore";
import { app } from "../firebase";
import Message from "./Message";

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

const ChatBottom = styled.div`
  padding: 100px;
`;

function ChatBody() {
  const bottomRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails, loading] = useDocument(
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

  useEffect(() => {
    // bottomRef?.current?.scrollIntoView({
    //   behavior: "smooth",
    // });
  }, [roomId, loading]);

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
        {messageDetails?.docs
          .sort(
            (doc1, doc2) =>
              new Date(doc1.data()?.timestamp?.toDate()) -
              new Date(doc2.data()?.timestamp?.toDate())
          )
          .map((doc) => {
            const { content, timestamp, user, userImage } = doc.data();
            return (
              <Message
                key={doc.id}
                message={content}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          })}
        <ChatBottom ref={bottomRef} />
      </ChatMessages>
      <ChatInput
        chatRef={bottomRef}
        channelName={roomDetails?.data().name}
        channelId={roomId}
      />
    </Container>
  );
}

export default ChatBody;
