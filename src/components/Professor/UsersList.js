import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Axios from "axios";
import { useStyles } from "./style";

const UsersList = props => {

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    firstname: { active: false, value: null },
    lastname: { active: false, value: null },
    email: { active: false, value: null },
    level: { active: false, value: null },
    department: { active: false, value: null },
    city: { active: false, value: null },
  });
  const [faculty, setFaculty] = useState({
    levels: null,
    departments: [],
  });

  const classes = useStyles();

  useEffect(() => {
    Axios.get("/api/profStudents").then((res) => {
      if (res.data.pass) {
        setUsers(res.data.users);
        setFaculty(res.data.faculty);
      }
    });
  }, []);

  useEffect(() => {
    const filtersData = { ...filter };

    for (let filterData in filtersData) {
      (filtersData[filterData].active === false ||
        filtersData[filterData].value === null) &&
        delete filtersData[filterData];
    }

    Axios.post("/api/filterStudents", { filter: filtersData }).then((res) =>
       setUsers(res.data.users)
    );
  }, [filter]);

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: { ...filter[e.target.name], value: e.target.value },
    });
  };

  const handleUserDetails = e => {
    Axios.post("/api/studentDetails", {
      _id: e.currentTarget.id
    })
    .then(res => res.data.pass && props.history.push({
      pathname: '/professor/student-details',
      state: { student: res.data.student }
    }))
  }

  return (
    <Grid>
      <Grid>
        <Grid style={{marginTop: '20px'}}>
          <Grid
            style={{ display: "inline-block", margin: "0 20px", cursor: 'pointer', backgroundColor: filter.firstname.active ? 'grey' : "white", width: '100px', textAlign: 'center', borderRadius: '10px' }}
            onClick={() =>
              setFilter({
                ...filter,
                firstname: {
                  ...filter.firstname,
                  active: !filter.firstname.active,
                  value: filter.firstname.active
                    ? null
                    : filter.firstname.value,
                },
              })
            }
          >
            <p>First Name</p>
          </Grid>
          <Grid
            style={{ display: "inline-block", margin: "0 20px", cursor: 'pointer', backgroundColor: filter.lastname.active ? 'grey' : "white", width: '100px', textAlign: 'center', borderRadius: '10px'  }}
            onClick={() =>
              setFilter({
                ...filter,
                lastname: {
                  ...filter.lastname,
                  active: !filter.lastname.active,
                  value: filter.lastname.active ? null : filter.lastname.value,
                },
              })
            }
          >
            <p>Last Name</p>
          </Grid>
          <Grid
            style={{ display: "inline-block", margin: "0 20px", cursor: 'pointer', backgroundColor: filter.email.active ? 'grey' : "white", width: '100px', textAlign: 'center', borderRadius: '10px'  }}
            onClick={() =>
              setFilter({
                ...filter,
                email: {
                  ...filter.email,
                  active: !filter.email.active,
                  value: filter.email.active ? null : filter.email.value,
                },
              })
            }
          >
            <p>Email</p>
          </Grid>
          <Grid
            style={{ display: "inline-block", margin: "0 20px", cursor: 'pointer', backgroundColor: filter.level.active ? 'grey' : "white", width: '100px', textAlign: 'center', borderRadius: '10px'  }}
            onClick={() =>
              setFilter({
                ...filter,
                level: {
                  ...filter.level,
                  active: !filter.level.active,
                  value: filter.level.active ? null : filter.level.value,
                },
              })
            }
          >
            <p>Level</p>
          </Grid>
          <Grid
            style={{ display: "inline-block", margin: "0 20px", cursor: 'pointer', backgroundColor: filter.department.active ? 'grey' : "white", width: '100px', textAlign: 'center', borderRadius: '10px'  }}
            onClick={() =>
              setFilter({
                ...filter,
                department: {
                  ...filter.department,
                  active: !filter.department.active,
                  value: filter.department.active
                    ? null
                    : filter.department.value,
                },
              })
            }
          >
            <p>Department</p>
          </Grid>
          <Grid
            style={{ display: "inline-block", margin: "0 20px", cursor: 'pointer', backgroundColor: filter.city.active ? 'grey' : "white", width: '100px', textAlign: 'center', borderRadius: '10px'  }}
            onClick={() =>
              setFilter({
                ...filter,
                city: {
                  ...filter.city,
                  active: !filter.city.active,
                  value: filter.city.active ? null : filter.city.value,
                },
              })
            }
          >
            <p>City</p>
          </Grid>
        </Grid>

        {filter.firstname.active && (
          <Grid>
            <p>First Name</p>
            <TextField name="firstname" onChange={handleChange} />
          </Grid>
        )}
        {filter.lastname.active && (
          <Grid>
            <p>Last Name</p>
            <TextField name="lastname" onChange={handleChange} />
          </Grid>
        )}
        {filter.email.active && (
          <Grid>
            <p>Email</p>
            <TextField name="email" onChange={handleChange} />
          </Grid>
        )}
        {filter.level.active && (
          <FormControl
            variant="filled"
            style={{ width: "10rem", marginTop: "1.5rem", width: "100%" }}
          >
            <InputLabel>Level</InputLabel>
            <Select
              name="level"
              defaultValue={null}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value={null}>None</MenuItem>
              {
                Array(faculty.levels).fill(null).map((level, index) => <MenuItem key={index} value={index+1}>{index+1}</MenuItem>)
              }
            </Select>
          </FormControl>
        )}
        {filter.department.active && (
          <FormControl
            variant="filled"
            style={{ width: "10rem", marginTop: "1.5rem", width: "100%" }}
          >
            <InputLabel>Level</InputLabel>
            <Select
              name="department"
              defaultValue={null}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value={null}>None</MenuItem>
              {
                faculty.departments.map( (department, index) => index !== 0 && <MenuItem key={index} value={department}>{department}</MenuItem> )
              }
            </Select>
          </FormControl>
        )}
        {filter.city.active && (
          <Grid>
            <p>City</p>
            <TextField name="city" onChange={handleChange} />
          </Grid>
        )}
      </Grid>
      <div
        className={classes.table}
        style={{ overflowX: "auto" }}
      >
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>firstname</th>
              <th>lastname</th>
              <th>email</th>
              <th>level</th>
              <th>department</th>
              <th>city</th>
              <th></th>
            </tr>
            {users.map((user, index) => (
              <tr key={index} id={user._id} onClick={handleUserDetails} className={classes.studentRow}>
                <td>
                  <img
                    style={{
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                    }}
                    src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${user.picture}`}
                  />
                </td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.level}</td>
                <td>{user.department}</td>
                <td>{user.city}</td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </Grid>
  );
};

export default UsersList;
