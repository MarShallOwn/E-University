import React, { useState, useEffect } from "react";
import _ from "lodash/fp";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import Axios from "axios";
import { set } from "lodash";

const EditUser = (props) => {

    const user = props.location.state.user;

    console.log(user)

  const { register, handleSubmit, errors, control } = useForm({ defaultValues: {firstname: user.firstname, lastname: user.lastname, nationalID: user.nationalID, level: user.level, department: user.department } });

  const [isProf, setIsProf] = useState(user.isProf);
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(user.faculty);
  const [selectedLevel, setSelectedLevel] = useState(user.level);
  const [showLevels, setShowLevels] = useState(true);
  const [levels, setLevels] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(false);

  const EditUser = (data) => {

    console.log(data)
    // reset the error state
    setError(false);

    // if the selected faculty is empty then trigger the required text and stop the create user request
    if (selectedFaculty.trim() === "") {
      setError(true);
      return;
    }
    // adding the rest of the data to the object
    data = { ...data, isProf, level: selectedLevel, faculty: selectedFaculty, _id: user._id };
    // if the selected level doesnt have departments then make it general
    if (departments.length === 0) data.department = "General"
    // if the user is prof them remove the level attribute and remove department attribute
    if (isProf) {
        delete data.level;
        delete data.department;
    } 

    // send a request to the api
    Axios.post("/api/adminEditUser", { data }).then(
      (res) => res.data.pass && props.history.push("/admin/users-list")
    );
  };

  useEffect(() => {
    // get a list of faculties names from api
    Axios.get("/api/getFacultiesNames").then(
      (res) => res.data.pass && setFaculties(res.data.faculties)
    );

    Axios.get(`/api/getFacultyLevels/${user.faculty}`).then((res) => {
        res.data.pass && setLevels(res.data.levelsNumber);
        !showLevels && setShowLevels(true);
    })

    if(!user.isProf){
    Axios.get(
        `/api/checkLevelHasDepartment/${user.faculty}/${parseInt(
          selectedLevel
        )}`
      ).then(
        (res) => res.data.pass && setDepartments(res.data.departments)
      );

    }
  }, []);

  const handleChange = (e) => {

    // if the element that triggered the onChange event is faculty
    if (e.target.name === "faculty") {
      setSelectedFaculty(e.target.value);

      // returns how many levels are in the faculty
      Axios.get(`/api/getFacultyLevels/${e.target.value}`).then((res) => {
        res.data.pass && setLevels(res.data.levelsNumber);
        !showLevels && setShowLevels(true);

        // if the faculty element isn't empty then get a list departments if there is
        if (e.target.value.trim() !== "" && !user.isProf) {

            // condition because a faculty like engineering got 5 years so when we switch to computer science the level will exceed
            // the level of computer science faculty by one and it will throw error so if that happens we will make it choose the last level in the college
            let searchedLevel;
            if(selectedLevel > res.data.levelsNumber){
                searchedLevel = res.data.levelsNumber; 
                setSelectedLevel(res.data.levelsNumber);
            }
            else{
                searchedLevel = selectedLevel;
            }

          Axios.get(
            `/api/checkLevelHasDepartment/${e.target.value}/${parseInt(searchedLevel)}`
          ).then(
            (res) => res.data.pass && setDepartments(res.data.departments)
          );
        }
      });
    } else if (e.target.name === "level") {
      setSelectedLevel(e.target.value);
      if (selectedFaculty.trim() !== "" && !user.isProf) {
        Axios.get(
          `/api/checkLevelHasDepartment/${selectedFaculty}/${parseInt(
            e.target.value
          )}`
        ).then((res) => res.data.pass && setDepartments(res.data.departments));
      }
    }
  };

  return (
    <Grid container alignItems="center" direction="column">
      <FormControl
        name="isProf"
        style={{ width: "10rem", marginTop: "1.5rem" }}
      >
        <InputLabel>Professor</InputLabel>
        <Select
          value={isProf}
          onChange={(e) => setIsProf(e.target.value)}
          displayEmpty
        >
          <MenuItem value={false}>False</MenuItem>
          <MenuItem value={true}>True</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="firstname"
        id="firstname"
        label="Firstname"
        defaultValue={user.firstName}
        inputRef={register({
          required: true,
        })}
        required
      />
      {_.get("firstname.type", errors) === "required" && (
        <p>This field is required</p>
      )}
      <TextField
        name="lastname"
        id="lastname"
        label="Lastname"
        inputRef={register({
          required: true,
        })}
        required
      />
      {_.get("lastname.type", errors) === "required" && (
        <p>This field is required</p>
      )}
      <TextField
        type="number"
        name="nationalID"
        id="nationalID"
        label="National ID"
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 14);
        }}
        inputRef={register({
          required: true,
          minLength: 14,
          maxLength: 14,
        })}
        required
      />
      {_.get("nationalID.type", errors) === "required" && (
        <p>This field is required</p>
      )}
      {(_.get("nationalID.type", errors) === "minLength" ||
        _.get("nationalID.type", errors) === "maxLength") && (
        <p>This field should be 14-digits</p>
      )}
      <FormControl style={{ width: "10rem", marginTop: "1.5rem" }}>
        <InputLabel>Faculty</InputLabel>
        <Select name="faculty" value={selectedFaculty} onChange={handleChange}>
          {faculties.map((faculty, index) => (
            <MenuItem key={index} value={faculty.name}>
              {faculty.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <p>This field is required</p>}

      {showLevels && !isProf && (
        <FormControl style={{ width: "10rem", marginTop: "1.5rem" }}>
          <InputLabel>Level</InputLabel>
          <Select name="level" value={selectedLevel} onChange={handleChange}>
            {levels !== 0 &&
              Array(levels)
                .fill(null)
                .map((level, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      )}

      {departments.length !== 0 && !isProf && (
        <>
          <FormControl
            component="fieldset"
            style={{ width: "10rem", marginTop: "1.5rem" }}
          >
            <FormLabel component="legend">Department</FormLabel>
            <Controller
              control={control}
              name={"department"}
              rules={{ required: true }}
              defaultValue={""}
              as={
                <RadioGroup>
                  {levels !== 0 &&
                    departments.map((department, index) => {
                      if (index !== 0) {
                        return (
                          <FormControlLabel
                            key={index}
                            value={department}
                            control={<Radio />}
                            label={department}
                          />
                        );
                      }
                    })}
                </RadioGroup>
              }
            />
          </FormControl>
          {_.get("department.type", errors) === "required" && (
            <p>This field is required</p>
          )}
        </>
      )}

      <Button
        style={{ marginTop: "2rem" }}
        variant="contained"
        color="primary"
        onClick={handleSubmit(EditUser)}
      >
        Edit User
      </Button>
    </Grid>
  );
};

export default EditUser;
