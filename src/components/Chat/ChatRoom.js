import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import { useUser } from "../../contexts/UserProvider";
import Axios from "axios";
import Messages from "./Messages";
import { MdSend } from "react-icons/md";

const ChatRoom = (props) => {
  const { socket, room } = props;

  const user = useUser();

  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => {
      socket.emit("leaveRoom", room._id);
    };
  }, [socket, room]);

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

  const { displayname, picture, isProf } = room.participants.find(
    (participant) => participant.email !== user.email
  );

  return (
    <Grid style={{ position: "relative", height: "100%" }}>
      <Grid container justify="center" alignItems="center" style={{ height: "90px", borderBottom: "1px solid #9696A0" }}>
        <Grid style={styles.tab}>
        <img
          style={{
            marginRight: "10px",
            width: "45px",
            height: "45px",
            borderRadius: "50%"
          }}
          src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${picture}`} />
          <div style={{display: 'inline-block'}}>
            <p style={{margin: '0', font: 'normal normal 600 16px/18px Poppins', color: '#252526'}}>
              {isProf && "Dr. "}
              {displayname}{" "}
              {isProf && <span style={styles.professorContainer}>Professor</span>}
            </p>
            <p style={{color: '#9696A0', font: 'normal normal normal 14px/5px Poppins'}}>Online</p>
          </div>
        </Grid>
      </Grid>

      <Messages socket={socket} room={room} />
      <div
        id="chat-input"
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          height: "90px",
          borderTop: "1px solid #9696A0",
          display: "inline-block",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "calc(100% - 0px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            float: "left",
          }}
        >
          <TextField
            style={{ width: "100%", margin: "0 100px" }}
            onChange={msgInputHandler}
            value={message}
            multiline
            rowsMax={3}
            variant="outlined"
            type="text"
            id="msg"
            name="msg"
            placeholder="Type your message..."
          />
        </div>
        <div
          style={{
            width: "100px",
            float: "right",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: 'absolute',
            right: 0
          }}
        >
          <div
          onClick={sendMessage}
            style={{
              backgroundColor: "#1C60B3",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MdSend color="white" />
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default ChatRoom;

const styles = {
  professorContainer: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "purple",
    padding: ".2rem",
    borderRadius: "5px",
  },
  tab: {
    cursor: "pointer",
    lineHeight: ".4rem",
    width: "99%",
    marginLeft: '20px'
  },
  professorContainer: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "purple",
    padding: ".2rem",
    borderRadius: "5px",
    fontSize: "13px",
    font: "normal normal bold 13px/18px Poppins",
  },
};

/*

      <div style={{ height: "90px", borderBottom: "1px solid black" }}>
        <img
          style={{
            marginRight: "10px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
          src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${picture}`}
        />
        <h2 style={{ display: "inline-block" }}>
          {isProf && "Dr. "}
          {displayname}{" "}
          {isProf && <span style={styles.professorContainer}>Professor</span>}
        </h2>
      </div>

*/
