import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import Axios from "axios";
import UserContact from "./UserContact";
import ChatRoom from "./ChatRoom";
import io from "socket.io-client";
import ProfessorsList from "./ProfessorsList";
import ListContainer from "./ListContainer";

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
    <Grid container>
      <Grid item xs={3}>
        <Link to="/profile">Profile</Link>
        <Button
          onClick={() => setShowProfessors(!showProfessors)}
          variant="contained"
          color="primary"
        >
          {showProfessors ? "Contacts" : "Professors"}
        </Button>
        <ListContainer>
          {showProfessors ? (
            <ProfessorsList openRoom={openRoom} professors={professors} />
          ) : (
            <UserContact openRoom={openRoom} contacts={contacts} />
          )}
        </ListContainer>
      </Grid>
      <Grid item xs={9}>
        {room && <ChatRoom socket={socket} room={room} />}
      </Grid>
    </Grid>
  );
};

export default Chat;
