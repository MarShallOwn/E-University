import React from "react";
import { Grid } from "@material-ui/core";
import { useUser } from "../../contexts/UserProvider";

const ProfessorsList = (props) => {
  const { openRoom, professors } = props;

  const user = useUser();

  /**
   * List all the users that are saved in the User's Contacts
   */
  const renderProfessors = professors.map((professor) => {
    return (
      <Grid
        key={professor.email}
        onClick={openRoom}
        id={professor.email}
        style={styles.tab}
      >
        <p>Dr. {professor.displayname}</p>
        <p>{professor.email}</p>
      </Grid>
    );
  });

  return (
    <>
      Faculty Of {user.faculty}
      <div id="professors">{renderProfessors}</div>
    </>
  );
};

export default ProfessorsList;

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
};
