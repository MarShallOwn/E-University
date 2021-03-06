import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import { Controller } from 'react-hook-form'
import _ from 'lodash/fp'
import { MdClear } from "react-icons/md";


const Subject = (props) => {
  const {
    value,
    deleteLevelField,
    register,
    errors,
    departments,
    hasDepartments,
    level,
    control,
    subjectNumber,
    subject,
    professors,
    setValue,
  } = props;

  const [term, setTerm] = useState(1);
  const [creditHours, setCreditHours] = useState(1);
  const [hasSection, setHasSection] = useState(1);
  const [selectedDepartments, setSelectedDepartments] = useState(
    subject ? subject.departments : Array(departments.length - 1).fill(false)
  );

  useEffect(() => {
    setSelectedDepartments(subject ? subject.departments : Array(departments.length - 1).fill(false));
    
    if((subject) && (subject.lectures.length !== 0)){
      register(`levels.${level}.subjects.${subjectNumber}.lectures`)
      setValue(`levels.${level}.subjects.${subjectNumber}.lectures`, subject.lectures)
    }
  }, [departments, hasDepartments]);

  const selectDepartmentsChange = (e) => {
    const changedSelection = [...selectedDepartments];
    changedSelection[parseInt(e.target.name)] = e.target.checked;
    setSelectedDepartments(changedSelection);
  };

  const checkSubjectHasSection = () => subject.hasSection ? 1 : 0;

  return (
    <Grid key={value} style={{borderBottom: '1px solid grey', padding: '2rem 0'}}>
      <Grid style={{ position: "relative" }}>
        <TextField
        defaultValue={subject ? subject.name : ''}
          id={`levels${value}`}
          name={`levels.${level}.subjects.${subjectNumber}.name`}
          label="Subject Name"
          inputRef={register({
            required: true,
          })}
          required
        />
        <MdClear
          style={{ position: "absolute", bottom: ".5rem" }}
          onClick={() => deleteLevelField(value)}
        />
        {_.get(`levels.${level}.subjects.${subjectNumber}.name.type`, errors) === "required" && (
          <p>This field is required</p>
        )}
      </Grid>

      <Grid style={{margin: '.5rem 0'}}>
        <FormControl
          variant="filled"
          style={{ width: "10rem", marginTop: "1.5rem" }}
        >
          <InputLabel>Subject's Term</InputLabel>
          <Controller
          control={control}
          name={`levels.${level}.subjects.${subjectNumber}.term`}
          defaultValue={subject ? subject.term : 1}
          as={
            <Select
            defaultValue={subject ? subject.term : 1}
            onChange={(e) => setTerm(e.target.value)}
            displayEmpty
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </Select>
          }
          />

        </FormControl>
      </Grid>

      <Grid style={{margin: '.5rem 0'}}>
        <FormControl
          variant="filled"
          style={{ width: "10rem", marginTop: "1.5rem" }}
        >
          <InputLabel>Credit Hours</InputLabel>
          <Controller 
          control={control}
          name={`levels.${level}.subjects.${subjectNumber}.creditHours`}
          defaultValue={subject ? subject.creditHours : 1}
          as={
            <Select
            defaultValue={subject ? subject.creditHours : 1}
            onChange={(e) => setCreditHours(e.target.value)}
            displayEmpty
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
          }
          />

        </FormControl>
      </Grid>
      
          {
            professors &&
            <Grid>
            <Grid style={{margin: '.5rem 0'}}>
            <FormControl
              variant="filled"
              style={{ width: "10rem", marginTop: "1.5rem" }}
            >
              <InputLabel>Professor</InputLabel>
              <Controller 
              control={control}
              name={`levels.${level}.subjects.${subjectNumber}.professor`}
              defaultValue={!subject || _.isEmpty(subject.professor) ? {} : subject.professor}
              as={
                <Select
                defaultValue={!subject || _.isEmpty(subject.professor) ? {} : subject.professor}
                displayEmpty
              >
                <MenuItem value={{}}>None</MenuItem>
                {
                professors.map((professor, index) => (
                  <MenuItem key={index} value={professor}>{`${professor.firstname} ${professor.lastname}`}</MenuItem>
                ))
                }
              </Select>
              }
              />
    
            </FormControl>
          </Grid>
          {
            subject && !_.isEmpty(subject.professor) &&
            <p>Current Professor: {`${subject.professor.firstname} ${subject.professor.lastname}`}</p>
          }
          </Grid>
          }




      <Grid style={{margin: '2rem 0'}}>
        <FormControl>
          <FormLabel>Has Section ?</FormLabel>
          <Controller
          control={control}
          name={`levels.${level}.subjects.${subjectNumber}.hasSection`}
          defaultValue={subject ? checkSubjectHasSection : 1}
          as={
            <Select
            defaultValue={subject ? checkSubjectHasSection : 1}
            onChange={e => setHasSection(parseInt(e.target.value))}
            displayEmpty
          >
            <MenuItem value={1}>True</MenuItem>
            <MenuItem value={0}>False</MenuItem>
          </Select>
          }
          />
        </FormControl>
      </Grid>

      <Grid style={{margin: '.5rem 0'}}>
        <FormControl name="creditHours" component="fieldset">
          <FormLabel component="legend">Departments</FormLabel>
          <FormGroup row>
            {hasDepartments ? (
              selectedDepartments.length !== 0 &&
              selectedDepartments.map((value, index) => (
                <FormControlLabel
                  key={index}
                  name={`levels.${level}.subjects.${subjectNumber}.departments[${index}]`}
                  inputRef={register}
                  control={
                    <Checkbox
                      color="primary"
                      defaultChecked={subject && value}
                      onChange={selectDepartmentsChange}
                    />
                  }
                  label={departments[index + 1]}
                />
              ))
            ) : (
              <FormControlLabel
                disabled
                name={`levels.${level}.subjects.${subjectNumber}.departments`}
                inputRef={register}
                control={<Checkbox checked color="primary" />}
                label="General"
              />
            )}
          </FormGroup>
          <FormHelperText>
            Select the departments that this subject is being taught in
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Subject;


/*



 */