import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import _ from "lodash/fp";
import { MdAdd } from "react-icons/md";
import Subject from "./Subject";

const MUISelect = (props) => {
  const { handleSelectChange } = props;
  return (
    <Select
      defaultValue={0}
      onChange={(e) => handleSelectChange(e)}
      displayEmpty
    >
      <MenuItem value={1}>True</MenuItem>
      <MenuItem value={0}>False</MenuItem>
    </Select>
  );
};

const Level = (props) => {
  const {
    styles,
    register,
    errors,
    departments,
    activeLevel,
    level,
    control,
    setValue={setValue}
  } = props;

  useEffect(() => {
    register({name: `levels.${level}.hasDepartments`});
  }, [register])

  const [levelsNumber, setLevelsNumber] = useState([]);
  const [hasDepartments, setHasDepartments] = useState(0);

  const deleteLevelField = (value) => {
    setLevelsNumber(() => levelsNumber.filter((item, index) => item !== value));
  };

  /**
   * render all the subjects
   */
  let renderSubjects = levelsNumber.map((value, index) => (
    <Subject
      key={value}
      value={value}
      register={register}
      errors={errors}
      deleteLevelField={deleteLevelField}
      departments={departments}
      hasDepartments={hasDepartments}
      level={level}
      subjectNumber={index + 1}
      control={control}
    />
  ));

  /**
   * @param {*} e
   * handle radio change of has departments
   */
  const handleSelectChange = (e) => {
    setValue(`levels.${level}.hasDepartments`, e.target.value)
    setHasDepartments(parseInt(e.target.value));
  };

  return (
    <Grid style={activeLevel !== level ? { display: "none" } : {}}>
      <Grid>
        <FormControl>
          <FormLabel>Has Departments ?</FormLabel>
          <Select
            name={`levels.${level}.hasDepartments`}
            defaultValue={0}
            onChange={(e) => handleSelectChange(e)}
            displayEmpty
            ref={register}
          >
            <MenuItem value={1}>True</MenuItem>
            <MenuItem value={0}>False</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid>
        <p style={{ display: "inline-block" }}>Subjects</p>
        <MdAdd
          onClick={() =>
            setLevelsNumber([
              ...levelsNumber,
              levelsNumber.length === 0
                ? 0
                : levelsNumber[levelsNumber.length - 1] + 1,
            ])
          }
          style={styles.addButton}
        />

        {renderSubjects}
      </Grid>
    </Grid>
  );
};

export default Level;
