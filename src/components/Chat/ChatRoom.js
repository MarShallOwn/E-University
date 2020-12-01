import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useUser } from "../../contexts/UserProvider";
import Axios from "axios";
import Messages from "./Messages";

const ChatRoom = (props) => {
  const { socket, room } = props;

  const user = useUser();

  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => {
      socket.emit("leaveRoom", room._id);
    };
  }, []);

  const msgInputHandler = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      Axios.post(
        "/api/sendMessage",
        {
          message: message.trim(),
          roomId: room._id,
        },
        {
          withCredentials: true,
        }
      );
      setMessage("");
    }
  };

  const { displayname, picture } = room.participants.find(
    (participant) => participant.email !== user.email
  );

  return (
    <Grid>
      <div style={{ marginBottom: "30px" }}>
        <img
          style={{
            marginRight: "10px",
            width: "75px",
            height: "75px",
            borderRadius: "50%",
          }}
          src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${picture}`}
        />
        <h2 style={{ display: "inline-block" }}>{displayname}</h2>
      </div>
      <Messages socket={socket} room={room} />
      <div id="chat-input">
        <div>
          <textarea
            style={{ width: "30rem" }}
            onChange={msgInputHandler}
            value={message}
            type="text"
            id="msg"
            name="msg"
            placeholder="Type your message..."
          />
        </div>
        <div>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </Grid>
  );
};

export default ChatRoom;
