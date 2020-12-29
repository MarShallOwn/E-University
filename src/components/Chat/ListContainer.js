import React from "react";
import { Grid } from "@material-ui/core";
import { useUser } from "../../contexts/UserProvider";

const ListContainer = ({ children }) => {
  const user = useUser();

  return (
    <Grid style={{height: '100%', position: 'relative', borderRight: '1px solid #9696A0', width: '100%'}}>
      {children}
      <Grid container alignItems="center" style={{height: '91px', borderTop: '1px solid #9696A0', position: 'absolute', bottom: '0', margin: '0', width: '100%', padding: '0 13px' }}>
          <p style={{color: '#2C4563', font: 'normal normal 600 14px/25px Poppins', fontSize: '14px'}}>E-mail: <span style={{color: '#707070', font: 'normal normal 400 14px/25px Poppins'}}>{user && user.email}</span></p>
      </Grid>
    </Grid>
  );
};

export default ListContainer;
