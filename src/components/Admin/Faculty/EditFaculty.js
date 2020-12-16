import React, { useState } from "react";
import _ from "lodash/fp";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import Axios from "axios";
import { MdAdd, MdClear, MdKeyboardArrowRight } from "react-icons/md";
import Level from "./Level";

const EditFaculty = (props) => {
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm();

  const [faculty, setFaculty] = useState(props.location.state.faculty)
  const [currentTerm, setCurrentTerm] = useState(faculty.currentTerm);
  const [levelsNumbers, setLevelsNumbers] = useState(faculty.levels.length);
  const [activeLevel, setActiveLevel] = useState(null);
  const [departmentsNumber, setDepartmentsNumber] = useState(() => {
      const array = []
      for(let i=0;i< faculty.departments.length-1;i++){
          array.push(i);
      }
      return array
  });
  const [departments, setDepartments] = useState(faculty.departments);

  const editFaculty = (data) => {
    data = { ...data, departments, currentTerm, name: data.name.trim() };
    data.levels = data.levels.filter((item) => item !== null);

    for (let level in data.levels) {
      if (data.levels[level].subjects)
        data.levels[level].subjects = data.levels[level].subjects.filter(
          (item) => item !== null
        );
    }

    Axios.post("/api/editFaculty", { data, id: faculty._id })
    .then(res => res.data.pass && props.history.push('/admin/faculties-list'));
  };

  const saveDepartments = (data) => {
    data.departments = data.departments.filter((item) => item !== null);
    for (let department of departments) {
      data.departments = data.departments.filter((item) => item !== department);
    }
    setDepartments([...departments, ...data.departments]);
  };

  const deleteDepartmentField = (value) => {
    setDepartments(() =>
      departments.filter(
        (item) => item !== document.getElementById(`departments${value}`).value
      )
    );
    setDepartmentsNumber(() =>
      departmentsNumber.filter((item, index) => item !== value)
    );
  };

  let renderDepartments = departmentsNumber.map((value, index) => (
    <Grid key={value} style={{ position: "relative" }}>
      <TextField
      defaultValue={faculty.departments[index+1]}
        id={`departments${value}`}
        name={`departments.${value}`}
        label="Department Name"
        inputRef={register2({
          required: true,
        })}
        required
      />
      <MdClear
        style={{ position: "absolute", bottom: ".5rem" }}
        onClick={() => deleteDepartmentField(value)}
      />
      {_.get(`departments[${value}].type`, errors) === "required" && (
        <p>This field is required</p>
      )}
    </Grid>
  ));

  const renderLevels = Array(levelsNumbers)
    .fill(null)
    .map((value, index) => (
      <Grid
        key={index}
        onClick={() => setActiveLevel(index + 1)}
        style={
          activeLevel === index + 1
            ? { backgroundColor: "gray", cursor: "pointer" }
            : { cursor: "pointer" }
        }
      >
        <p style={{ display: "inline-block", marginRight: "1rem" }}>
          Level {index + 1}
        </p>
        <MdKeyboardArrowRight />
      </Grid>
    ));

  return (
    <Grid container>
      <Grid
        container
        xs={4}
        direction="column"
        item
        style={{ padding: "0 10rem" }}
      >
        <TextField
            defaultValue={faculty.name}
          name="name"
          id="name"
          label="Faculty Name"
          required
          inputRef={register({
            required: true,
          })}
        />
        {_.get("name.type", errors) === "required" && (
          <p>This field is required</p>
        )}

        <FormControl name="currentTerm" variant="filled">
          <InputLabel>Current Term</InputLabel>
          <Controller
            control={control}
            as={
              <Select
                defaultValue={1}
                onChange={(e) => setCurrentTerm(e.target.value)}
                displayEmpty
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
              </Select>
            }
            defaultValue={1}
            name="currentTerm"
          />
        </FormControl>

        <Grid>
          <p style={{ display: "inline-block" }}>Departments</p>
          <MdAdd
            onClick={() =>
              setDepartmentsNumber([
                ...departmentsNumber,
                departmentsNumber.length === 0
                  ? 0
                  : departmentsNumber[departmentsNumber.length - 1] + 1,
              ])
            }
            style={styles.addButton}
          />
        </Grid>

        <TextField disabled label="Department Name" defaultValue="General" />

        {renderDepartments}

        <Button
          style={{ marginTop: "2rem" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit2(saveDepartments)}
        >
          Save
        </Button>

        <FormControl
          name="levelsNumber"
          variant="filled"
          style={{ width: "10rem", marginTop: "1.5rem" }}
        >
          <InputLabel>Number of levels</InputLabel>
          <Select
            defaultValue={levelsNumbers}
            onChange={(e) => setLevelsNumbers(e.target.value)}
            displayEmpty
            required
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </FormControl>

        <Button
          style={{ marginTop: "2rem" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit(editFaculty)}
        >
          Edit Faculty
        </Button>
      </Grid>

      <Grid item xs={2}>
        {renderLevels}
      </Grid>

      <Grid item xs={6} style={{ padding: "0 10rem", paddingLeft: "5rem" }}>
        {Array(levelsNumbers)
          .fill(null)
          .map((value, index) => (
            <Level
              key={index}
              styles={styles}
              register={register}
              errors={errors}
              departments={departments}
              level={index + 1}
              activeLevel={activeLevel}
              control={control}
              setValue={setValue}
              levelData={faculty.levels[index]}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default EditFaculty;

const styles = {
  addButton: {
    float: "right",
    marginLeft: "5rem",
    cursor: "pointer",
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    verticalAlign: "center",
  },
};
