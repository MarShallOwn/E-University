import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Axios from "axios";
import { useStyles } from './style'
import { MdModeEdit } from 'react-icons/md'

const FacultiesList = props => {
  const [faculties, setFaculties] = useState([]);

  const classes = useStyles()

  useEffect(() => {
    Axios.get("/api/allFaculties").then(
      (res) => res.data.pass && setFaculties(res.data.faculties)
    );
  }, []);

  const handleEdit = e => {
      Axios.post("/api/facultyToBeEdited", { id: e.target.id }, { withCredentials: true })
      .then(res => res.data.pass && props.history.push({
        pathname: '/admin/edit-faculty',
        state: { faculty: res.data.faculty }
      }))
  }

  return (
    <Grid className={classes.table}>
      <div style={{ overflowX: "auto" }}>
        <table>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
          {faculties.map((faculty, index) => (
            <tr key={index}>
              <td>{faculty.name}</td>
              <td><MdModeEdit id={faculty._id} onClick={handleEdit} /></td>
            </tr>
          ))}
        </table>
      </div>
    </Grid>
  );
};

export default FacultiesList;
