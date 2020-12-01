import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import _ from "lodash/fp";
import { useUser } from "../../contexts/UserProvider";
import { useForm } from "react-hook-form";
import Axios from "axios";

const initUser = {
  displayname: null,
  email: null,
  city: null,
  phoneNumber: null,
  picture: null,
  department: null,
  faculty: null,
  level: null,
};

const UserContact = (props) => {
  const { socket, setRoom, room } = props;

  const user = useUser();
  const { register, handleSubmit, errors } = useForm();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    searchInput === "" && setSearchedUser(initUser);
    setSearchInput(e.target.value);
  };

  /**
   * User's Contacts List
   */
  const [contacts, setContacts] = useState([]);

  /**
   * Store searched user
   */
  const [searchedUser, setSearchedUser] = useState(initUser);

  const getContacts = () => {
    Axios.get("/api/contacts", { withCredentials: true }).then((res) => {
      setContacts(res.data);
    });
  };

  useEffect(() => {
      getContacts()
  }, []);

  /**
   * @param {*} e
   *  Handle Search User if it is done using "Enter" key
   */
  const emailSearchKeyPressHandle = (e) => {
    if (e.key === "Enter") {
      handleSubmit(emailSearchHandle);
    }
  };

  /**
   * @param {*} data
   * Search for User using email and return it to be saved in state
   */
  const emailSearchHandle = (data) => {
    if (data.emailSearch !== "") {
      Axios.get(`/api/chat/search?email=${data.emailSearch}`, {
        withCredentials: true,
      }).then((res) => {
        res.data.pass && setSearchedUser(res.data.user);
      });
    }
  };

  /**
   * @param {*} e
   * Open Chat room for the selected User
   */
  const openRoom = (e) => {
    Axios.post(
      "/api/chat/room",
      {
        email: e.target.id,
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

  /**
   * List the Searched User
   */
  const renderSearchedEmail = (
    <p onClick={openRoom} id={searchedUser.email}>
      {searchedUser.displayname}
      {searchedUser.email}
    </p>
  );

  /**
   * List all the users that are saved in the User's Contacts
   */
  const renderContactsEmail = contacts.map((contact) => {
    return (
      <p key={contact.email} onClick={openRoom} id={contact.email}>
        {contact.displayname}
        {contact.email}
      </p>
    );
  });

  /**
   * If Search input is empty then show the list of contacts and if it is not empty then empty the list to get the searched user
   */
  const renderResult =
    searchInput === "" ? renderContactsEmail : renderSearchedEmail;

  return (
    <Grid>
      {_.get("email.type", errors) === "required" && (
        <p>This field is required</p>
      )}
      {_.get("email.type", errors) === "pattern" && (
        <p>Please include an '@' in the email address and write the domain</p>
      )}
      <div style={{ marginBottom: "20px" }} id="profile-mini-card">
        <img
          style={{ height: "2rem" }}
          src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${user.picture}`}
        />
        <h4 style={{ display: "inline-block" }}>
          {user && `${user.firstname} ${user.lastname}`}
        </h4>
      </div>
      <div id="input-section">
        <TextField
          variant="outlined"
          size="small"
          type="email"
          name="emailSearch"
          id="emailSearch"
          label="Search by E-mail"
          onChange={handleSearchInput}
          inputRef={register({
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
          onKeyPress={emailSearchKeyPressHandle}
          placeholder="Search for user"
        />
        <button onClick={handleSubmit(emailSearchHandle)}>Search</button>
      </div>
      <div id="users">{renderResult}</div>
      <p style={{ marginTop: "20%" }}>UserName: {user && user.email}</p>
    </Grid>
  );
};

export default UserContact;
