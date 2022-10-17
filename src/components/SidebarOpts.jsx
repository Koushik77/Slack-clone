import React from "react";
import styled from "styled-components";
import { createRoom, getRooms } from "../firestore-crud";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  > h3 {
    padding-bottom: 2px;
    font-size: 14px;
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }

  :hover {
    opacity: 0.9;
    background: #340e36;
  }
`;

const Channel = styled.h3`
  margin-left: 10%;
  font-weight: 300;
`;

function SidebarOpts({ Icon, title, setShowOptions, toggleChannels, id }) {
  const dispatch = useDispatch();
  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      createRoom({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {
    console.log("channel id selected ", id);
    if(id) {
      dispatch(enterRoom({
        roomId: id,
      }));
    }
  };

  const handleOptClick = () => {
    switch(title) {
        case 'Add channel':
            addChannel();
            break;
        case 'Channels':
            toggleChannels();
            break;
        case 'Show more':
            setShowOptions(true);
            break;
        case 'Show less':
            setShowOptions(false);
            break;
        default:
            selectChannel();
    }
  }

  return (
    <Container onClick={handleOptClick}>
      {Icon && <Icon fontSize="small" style={{ padding: "10px" }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <Channel>
          <span>#</span> {title}
        </Channel>
      )}
    </Container>
  );
}

export default SidebarOpts;
