import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useUser } from "../../contexts/UserProvider";
import Message from "./Message";

const Messages = (props) => {
  const { socket, room } = props;

  const user = useUser();

  const [messages, setMessages] = useState([]);

  const style = {
    container: {
      height: "calc(100% - 180px)",
      overflowY: "auto",
    },
    rightMessage: {
      float: "right",
      display: "block",
      clear: "both",
      backgroundColor: '#1C60B3',
      borderRadius: '32px',
      padding: '8px 20px',
      margin: '5px 20px 5px 0px'
    },
    leftMessage: {
      float: "left",
      display: "block",
      clear: "both",
      backgroundColor: '#9696A0',
      borderRadius: '32px',
      padding: '8px 20px',
      margin: '5px 20px 5px 20px'
    },
  };

  useEffect(() => {
    const immediateFunction = async () => {
      await getOldMessages();
      const objDiv = document.getElementById("messages-container");
      objDiv.scrollTop = objDiv.scrollHeight;
    };
    immediateFunction();
  }, []);

  const addMessage = (displayname, email, message, messageId) => {
    if (user.email === email) {
      return (
        <Message
          key={messageId}
          style={style.rightMessage}
          message={message}
          id={messageId}
          socket={socket}
          direction={"right"}
        />
      );
    } else {
      return (
        <Message
          key={messageId}
          style={style.leftMessage}
          message={message}
          id={messageId}
          socket={socket}
          direction={"left"}
        />
      );
    }
  };

  const getOldMessages = () => {
    const oldMessages = room.messages.map((msg) => {
      return addMessage(
        msg.from.displayname,
        msg.from.email,
        msg.message,
        msg._id
      );
    });
    setMessages(oldMessages);
  };

  // Recieve msg from server and displays it
  socket
    .off("message")
    .on("message", ({ displayname, email, message, messageId }) => {
      setMessages((currMessages) => [
        ...currMessages,
        addMessage(displayname, email, message, messageId),
      ]);
      const objDiv = document.getElementById("messages-container");
      objDiv.scrollTop = objDiv.scrollHeight;
    });

  return (
    <Grid id="messages-container" style={style.container}>
      {messages}
    </Grid>
  );
};

export default Messages;
