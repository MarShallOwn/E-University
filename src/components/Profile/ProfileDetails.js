import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useUser } from '../../contexts/UserProvider';

const ProfileDetails = () => {

    const user = useUser()

    console.log(user)

  return (
    <>
      <Grid>
        <Typography display="inline" variant="body1">
          FullName:{" "}
        </Typography>
        {user.isProf && "Dr. "}
        {`${user.firstname} ${user.lastname}`}
      </Grid>
      <Grid>
        <Typography display="inline" variant="body1">
          E-mail:{" "}
        </Typography>
        {user.email}
      </Grid>
      {user.street && (
        <Grid>
          <Typography display="inline" variant="body1">
            Street:{" "}
          </Typography>
          {user.street}
        </Grid>
      )}
      <Grid>
        <Typography display="inline" variant="body1">
          City:{" "}
        </Typography>
        {user.city}
      </Grid>
      <Grid>
        <Typography display="inline" variant="body1">
          Phone Number:{" "}
        </Typography>
        {user.phoneNumber}
      </Grid>
      <Grid>
        <Typography display="inline" variant="body1">
          Faculty:{" "}
        </Typography>
        {user.faculty}
      </Grid>
      {!user.isProf && (
        <>
          <Grid>
            <Typography display="inline" variant="body1">
              Department:{" "}
            </Typography>
            {user.department}
          </Grid>
          <Grid>
            <Typography display="inline" variant="body1">
              Level:{" "}
            </Typography>
            {user.level}
          </Grid>
        </>
      )}
    </>
  );
};

export default ProfileDetails;
