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
        <p style={{font: 'normal normal bold 16px/18px Poppins', color: '#424446', fontSize: '16px'}}>Dr. {professor.displayname}</p>
        <p style={{color: '#9696A0', font: 'normal normal bold 14px/12px Poppins'}}>{professor.email}</p>
      </Grid>
    );
  });

  return (
    <>
    <div style={{margin: '0 13px', textAlign: 'center'}}>
    <p style={{font: 'normal normal bold 17px/18px Poppins', color: '#424446', fontSize: '17px'}}>Faculty Of {user.faculty}</p>
    </div>
      <div id="professors" style={{marginTop: '30px'}}>{renderProfessors}</div>
    </>
  );
};

export default ProfessorsList;

const styles = {
  tab: {
    cursor: "pointer",
    lineHeight: ".4rem",
    margin: "1rem 0",
    width: "99%",
    paddingLeft: '13px',
  },
};
