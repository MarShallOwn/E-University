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

const CreateUser = (props) => {
  const { register, handleSubmit, errors, control } = useForm();

  const [isProf, setIsProf] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showLevels, setShowLevels] = useState(false);
  const [levels, setLevels] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(false);

  const createUser = (data) => {
    // reset the error state
    setError(false);

    // if the selected faculty is empty then trigger the required text and stop the create user request
    if (selectedFaculty.trim() === "") {
      setError(true);
      return;
    }
    // adding the rest of the data to the object
    data = { ...data, isProf, level: selectedLevel, faculty: selectedFaculty };
    // if the selected level doesnt have departments then make it general
    if (departments.length === 0) data.department = "General"
    // if the user is prof them remove the level attribute and remove department attribute
    if (isProf) {
        delete data.level;
        delete data.department;
    } 

    // send a request to the api
    Axios.post("/api/createUser", { data }).then(
      (res) => res.data.status === 200 && props.history.push("/home")
    );
  };

  useEffect(() => {
    // get a list of faculties names from api
    Axios.get("/api/getFacultiesNames").then(
      (res) => res.data.pass && setFaculties(res.data.faculties)
    );
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
        if (e.target.value.trim() !== "") {
          Axios.get(
            `/api/checkLevelHasDepartment/${e.target.value}/${parseInt(
              selectedLevel
            )}`
          ).then(
            (res) => res.data.pass && setDepartments(res.data.departments)
          );
        }
      });
    } else if (e.target.name === "level") {
      setSelectedLevel(e.target.value);
      if (selectedFaculty.trim() !== "") {
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
              defaultValue=""
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
        onClick={handleSubmit(createUser)}
      >
        Create User
      </Button>
    </Grid>
  );
};

export default CreateUser;
