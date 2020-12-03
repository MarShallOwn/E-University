import React, { useState } from "react";
import { Grid } from "@material-ui/core";

const Message = (props) => {
  const { message, id, direction, socket, style } = props;

  const [newMessage, setNewMessage] = useState(message);

  //const isDeleted = newMessage === "Deleted Message" ? true : false

  socket.off(`deleteMessage:${id}`).on(`deleteMessage:${id}`, () => {
    setNewMessage("Deleted Message");
  });

  return (
    <Grid style={style}>
      <p>{newMessage}</p>
      <div style={{ marginBottom: "20px" }}>
        {/* (direction === "right" && !isDeleted) && <MessageSettings messageId={id} /> */}
      </div>
    </Grid>
  );
};

export default Message;
