import React, { useState } from "react";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import _ from "lodash/fp";
import { useUser } from "../../contexts/UserProvider";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
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
        <p style={{font: 'normal normal bold 16px/18px Poppins', color: '#424446', fontSize: '16px'}}>
          {contact.isProf && "Dr. "}
          {contact.displayname}{" "}
          {contact.isProf && (
            <span style={styles.professorContainer}>Professor</span>
          )}
        </p>
        <p style={{color: '#9696A0', font: 'normal normal bold 14px/12px Poppins'}}>{contact.email}</p>
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
      <div id="input-section" style={{display: 'flex', justifyContent: 'center', position: 'absolute', top: '50px', width: 'calc(100% - 26px)',
    left: '50%', transform: 'translate(-50%, 0)'}}>
        <TextField
          variant="outlined"
          size="small"
          type="email"
          name="emailSearch"
          id="emailSearch"
          value={searchInput}
          label="Search by E-mail"
          /* styles the wrapper */
          style={{ height: "29px", width: '100%' }}
          /* styles the label component */
          InputLabelProps={{
            style: {
              height: "29px",
              top: `-5px`,
            },
          }}
          /* styles the input component */
          inputProps={{
            style: {
              height: "29px",
              padding: "0 14px",
            },
          }}
          onChange={handleSearchInput}
          inputRef={register({
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
          InputProps={{
            endAdornment: (
              <>
                {searchInput !== "" && (
                  <InputAdornment onClick={handleSubmit(emailSearchHandle)}>
                    <MdSearch
                      fontSize="1.2rem"
                      style={{
                        transform: "scale(-1, 1)",
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
      </div>
      <div id="users" style={{marginTop: '30px'}}>{renderResult}</div>
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
    margin: "1rem 0",
    width: "99%",
    paddingLeft: '13px',
  },
  professorContainer: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "purple",
    padding: ".2rem",
    borderRadius: "5px",
    fontSize: '13px',
    font: "normal normal bold 13px/18px Poppins",
  },
};
