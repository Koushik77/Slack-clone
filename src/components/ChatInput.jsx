import React, { useRef } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import { addMessageToRoom } from "../firestore-crud";

const ChatContainer = styled.div`
  border-radius: 20px;

  > form {
    display: flex;
    position: relative;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    width: 60%;
    bottom: 30px;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none;
  }
`;

function ChatInput({ channelName, channelId }) {
  const inputRef = useRef(null);
  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) return;

    addMessageToRoom(
      {
        content: inputRef.current.value,
        timestamp: serverTimestamp(),
        user: "Koushik Ghosh",
        userImage:
          "https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg",
      },
      channelId
    );

    inputRef.current.value = null;
  };
  return (
    <ChatContainer>
      <form>
        <input ref={inputRef} placeholder={`Message room`} />
        <Button hidden type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatContainer>
  );
}

export default ChatInput;
