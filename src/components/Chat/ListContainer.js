import React from "react";
import { Grid } from "@material-ui/core";
import { useUser } from "../../contexts/UserProvider";

const ListContainer = ({ children }) => {
  const user = useUser();

  return (
    <Grid>
      <div style={{ marginBottom: "20px" }} id="profile-mini-card">
        <img
          style={{ height: "2rem" }}
          src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${user.picture}`}
        />
        <h4 style={{ display: "inline-block" }}>
          {user && `${user.firstname} ${user.lastname}`}
        </h4>
      </div>
      {children}
      <p style={{ marginTop: "20%" }}>UserName: {user && user.email}</p>
    </Grid>
  );
};

export default ListContainer;
