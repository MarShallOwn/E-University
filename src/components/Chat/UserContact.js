import React, { useState } from "react";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import _ from "lodash/fp";
import { useUser } from "../../contexts/UserProvider";
import { useForm } from "react-hook-form";
import { MdClear } from "react-icons/md";
import Axios from "axios";

const UserContact = (props) => {
  const { openRoom, contacts } = props;

  const user = useUser();
  const { register, handleSubmit, errors } = useForm();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    searchInput === "" && setSearchedUser(initUser);
    setSearchInput(e.target.value);
  };

  /**
   * Store searched user
   */
  const [searchedUser, setSearchedUser] = useState(initUser);

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
    if (data.emailSearch !== "" && data.emailSearch !== user.email) {
      Axios.get(`/api/chat/search?email=${data.emailSearch}`, {
        withCredentials: true,
      }).then((res) => {
        res.data.pass && setSearchedUser(res.data.user);
      });
    }
  };

  /**
   * List the Searched User
   */
  const renderSearchedEmail = searchedUser.email && (
    <Grid onClick={openRoom} id={searchedUser.email} style={styles.tab}>
      <p>
        {searchedUser.isProf && "Dr. "}
        {searchedUser.displayname}{" "}
        {searchedUser.isProf && (
          <span style={styles.professorContainer}>Professor</span>
        )}
      </p>
      <p>{searchedUser.email}</p>
    </Grid>
  );

  /**
   * List all the users that are saved in the User's Contacts
   */
  const renderContactsEmail = contacts.map((contact) => {
    return (
      <Grid
        key={contact.email}
        onClick={openRoom}
        id={contact.email}
        style={styles.tab}
      >
        <p>
          {contact.isProf && "Dr. "}
          {contact.displayname}{" "}
          {contact.isProf && (
            <span style={styles.professorContainer}>Professor</span>
          )}
        </p>
        <p>{contact.email}</p>
      </Grid>
    );
  });

  /**
   * If Search input is empty then show the list of contacts and if it is not empty then empty the list to get the searched user
   */
  const renderResult =
    searchInput === "" ? renderContactsEmail : renderSearchedEmail;

  return (
    <>
      {_.get("email.type", errors) === "required" && (
        <p>This field is required</p>
      )}
      {_.get("email.type", errors) === "pattern" && (
        <p>Please include an '@' in the email address and write the domain</p>
      )}
      <div id="input-section">
        <TextField
          variant="outlined"
          size="small"
          type="email"
          name="emailSearch"
          id="emailSearch"
          value={searchInput}
          label="Search by E-mail"
          onChange={handleSearchInput}
          inputRef={register({
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
          InputProps={{
            endAdornment: (
              <>
                {searchInput !== "" && (
                  <InputAdornment onClick={() => setSearchInput("")}>
                    <MdClear
                      fontSize="1.2rem"
                      style={{
                        backgroundColor: "black",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      color="white"
                    />
                  </InputAdornment>
                )}
              </>
            ),
          }}
          onKeyPress={emailSearchKeyPressHandle}
          placeholder="Search for user"
        />
        <button onClick={handleSubmit(emailSearchHandle)}>Search</button>
      </div>
      <div id="users">{renderResult}</div>
    </>
  );
};

export default UserContact;

const initUser = {
  displayname: null,
  email: null,
  city: null,
  phoneNumber: null,
  picture: null,
  department: null,
  faculty: null,
  level: null,
  isProf: null,
};

const styles = {
  tab: {
    cursor: "pointer",
    lineHeight: ".4rem",
    margin: "1rem .2rem",
    paddingLeft: ".5rem",
    border: "1px solid black",
    width: "75%",
    borderRadius: "10px",
  },
  professorContainer: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "purple",
    padding: ".2rem",
    borderRadius: "5px",
  },
};
