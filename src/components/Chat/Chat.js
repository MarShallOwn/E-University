import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import Axios from "axios";
import UserContact from "./UserContact";
import ChatRoom from "./ChatRoom";
import io from "socket.io-client";
import ProfessorsList from "./ProfessorsList";
import ListContainer from "./ListContainer";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const Chat = (props) => {
  const [room, setRoom] = useState(null);
  const [socket, setSocket] = useState();
  const [showProfessors, setShowProfessors] = useState(false);
  const [professors, setProfessors] = useState([]);
  const [contacts, setContacts] = useState([]);

  const getContacts = () => {
    Axios.get("/api/contacts", { withCredentials: true }).then((res) => {
      setContacts(res.data);
    });
  };

  /**
   * @param {*} e
   * Open Chat room for the selected User
   */
  const openRoom = (e) => {
    Axios.post(
      "/api/chat/room",
      {
        email: e.currentTarget.id,
      },
      {
        withCredentials: true,
      }
    ).then((res) => {
      if ((room && room._id) !== res.data.room._id) {
        getContacts();
        socket.emit("create", res.data.room._id);
        setRoom(null);
        setRoom(res.data.room);
      }
    });
  };

  useEffect(() => {
    const socketFetch = io("http://localhost:8080");

    setSocket(socketFetch);

    getContacts();

    Axios.get("/api/professors", { withCredentials: true }).then((res) => {
      res.data.pass && setProfessors(res.data.professors);
    });

    return () => {
      socketFetch.close();
    };
  }, []);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ width: "100%", height: "calc(100vh - 3.5rem)" }}
    >
      <Grid
        item
        style={{
          width: "1109px",
          height: "672px",
          border: "1px solid #9696A0",
          borderRadius: "10px",
        }}
      >
        <Grid
          item
          style={{
            float: "left",
            width: "calc(100% - 825.5px)",
            height: "100%",
          }}
        >
          <ListContainer>
            <div style={{ height: "89px", borderBottom: "1px solid #9696A0" }}>
              <div
                style={{
                  font: "normal normal 600 18px/27px Poppins",
                  color: "#2C4563",
                  fontSize: "18px",
                }}
                onClick={() => setShowProfessors(!showProfessors)}
              >
                <p style={{ margin: "0", display: "inline-block", marginLeft: '13px',
                  marginTop: '15px' }}>
                  {showProfessors ? "Professors" : "Contacts"}
                </p>
                <MdExpandMore />
              </div>
            </div>

            <div
              style={{
                height: "calc(100% - 180px)",
                paddingBottom: "-180px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {showProfessors ? (
                <ProfessorsList openRoom={openRoom} professors={professors} />
              ) : (
                <UserContact openRoom={openRoom} contacts={contacts} />
              )}
            </div>
          </ListContainer>
        </Grid>
        <Grid
          item
          style={{
            float: "right",
            width: "825.5px",
            height: "100%",
          }}
        >
          {room ? (
            <ChatRoom socket={socket} room={room} />
          ) : (
            <Grid container justify="center" alignItems="center" style={{width: '100%', height: '100%', font: 'normal normal normal 18px/5px Poppins', }}>
              Select a Contact to Start Chatting
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Chat;
