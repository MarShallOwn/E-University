import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import Axios from "axios";
import { useStyles } from "./style";
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from 'react-icons/md'

const Users = props => {

    const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    firstname: { active: false, value: null },
    lastname: { active: false, value: null },
    email: { active: false, value: null },
    nationalID: {active: false, value: null},
    faculty: {active: false, value: null},
    level: { active: false, value: null },
    department: { active: false, value: null },
    city: { active: false, value: null },
    isProf: { active: false, value: null}
  });
  const [faculty, setFaculty] = useState({
    departments: [],
  });

  const [faculties, setFaculties] = useState([])


  useEffect(() => {
    Axios.get("/api/adminUsers").then((res) => {
      if (res.data.pass) {
        setUsers(res.data.users);    
      }
    });

    Axios.get("/api/getFacultiesNames").then(
        (res) => res.data.pass && setFaculties(res.data.faculties)
    );
  }, []);

  useEffect(() => {
    const filtersData = { ...filter };

    for (let filterData in filtersData) {
      (filtersData[filterData].active === false ||
        filtersData[filterData].value === null) &&
        delete filtersData[filterData];
    }

    Axios.post("/api/filterUsers", { filter: filtersData }).then((res) =>
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

  const userOptionsHandler = e => {
      const elemName = e.currentTarget.getAttribute("name");

      if(elemName === "edit"){

        Axios.post("/api/userToBeEdited", { id: e.currentTarget.id }, { withCredentials: true })
        .then(res => res.data.pass && props.history.push({
        pathname: '/admin/edit-user',
        state: { user: res.data.user }
        }))
      }
      else{

        Axios.post("/api/userToBeDeleted", { id: e.currentTarget.id }, { withCredentials: true })
        .then(res => res.data.pass && props.history.push({
            pathname: '/admin/delete-user',
            state: { user: res.data.user}
        }))
      }
        e.stopPropagation()
    }

  return (
    <Grid>
      <Grid style={{paddingTop: '10px'}}>
        <Link to="/admin/create-user" style={{textDecoration: 'none', marginLeft: "10px"}}>
          <Button variant="contained" color="primary">Create User</Button>
        </Link>
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
            style={{ display: "inline-block", margin: "0 20px", cursor: 'pointer', backgroundColor: filter.nationalID.active ? 'grey' : "white", width: '100px', textAlign: 'center', borderRadius: '10px'  }}
            onClick={() =>
              setFilter({
                ...filter,
                nationalID: {
                  ...filter.nationalID,
                  active: !filter.nationalID.active,
                  value: filter.nationalID.active ? null : filter.nationalID.value,
                },
              })
            }
          >
            <p>National ID</p>
          </Grid>
          <Grid
            style={{ display: "inline-block", margin: "0 20px", cursor: 'pointer', backgroundColor: filter.faculty.active ? 'grey' : "white", width: '100px', textAlign: 'center', borderRadius: '10px'  }}
            onClick={() =>
              setFilter({
                ...filter,
                faculty: {
                  ...filter.faculty,
                  active: !filter.faculty.active,
                  value: filter.faculty.active ? null : filter.faculty.value,
                },
              })
            }
          >
            <p>Faculty</p>
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
          {
              (filter.faculty.active && filter.faculty.value !== null) &&
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
          }
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
          <Grid
            style={{ display: "inline-block", margin: "0 20px", cursor: 'pointer', backgroundColor: filter.isProf.active ? 'grey' : "white", width: '100px', textAlign: 'center', borderRadius: '10px'  }}
            onClick={() =>
              setFilter({
                ...filter,
                isProf: {
                  ...filter.isProf,
                  active: !filter.isProf.active,
                  value: filter.isProf.active ? null : filter.isProf.value,
                },
              })
            }
          >
            <p>Is Professor</p>
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
        {filter.nationalID.active && (
          <Grid>
            <p>National ID</p>
            <TextField type="num" name="nationalID" onChange={handleChange} />
          </Grid>
        )}
        {filter.faculty.active && (
          <FormControl
            variant="filled"
            style={{ width: "10rem", marginTop: "1.5rem", width: "100%" }}
          >
            <InputLabel>Faculty</InputLabel>
            <Select
              name="faculty"
              defaultValue={null}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value={null}>None</MenuItem>
              {
                faculties.map((faculty, index) => <MenuItem key={index} value={faculty.name}>{faculty.name}</MenuItem>)
              }
            </Select>
          </FormControl>
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
                Array(8).fill(null).map((level, index) => <MenuItem key={index} value={index+1}>{index+1}</MenuItem>)
              }
            </Select>
          </FormControl>
        )}
        {(filter.department.active && filter.faculty.active && filter.faculty.value !== null) && (
          <FormControl
            variant="filled"
            style={{ width: "10rem", marginTop: "1.5rem", width: "100%" }}
          >
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              defaultValue={null}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value={null}>None</MenuItem>
              <MenuItem value={"general"}>General</MenuItem>
              {
                faculties.find(faculty => faculty.name === filter.faculty.value).departments.map( (department, index) => index !== 0 && <MenuItem key={index} value={department}>{department}</MenuItem> )
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
        {filter.isProf.active && (
          <FormControl
            variant="filled"
            style={{ width: "10rem", marginTop: "1.5rem", width: "100%" }}
          >
            <InputLabel>Is Professor</InputLabel>
            <Select
              name="isProf"
              defaultValue={null}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value={null}>None</MenuItem>
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
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
              <th>National ID</th>
              <th>Faculty</th>
              <th>level</th>
              <th>department</th>
              <th>city</th>
              <th>Is Professor</th>
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
                <td>{user.nationalID}</td>
                <td>{user.faculty}</td>
                <td>{user.level}</td>
                <td>{user.department}</td>
                <td>{user.city}</td>
                <td>{user.isProf ? "true" : "false"}</td>
                <td><MdEdit name="edit" id={user._id} onClick={userOptionsHandler} /> | <MdDelete name="delete" id={user._id} onClick={userOptionsHandler} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </Grid>
  );
};

export default Users;
