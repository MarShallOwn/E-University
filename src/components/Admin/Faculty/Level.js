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
    levelData,
    professors,
    setValue = { setValue },
  } = props;

  useEffect(() => {
    register({ name: `levels.${level}.hasDepartments` });
  }, [register]);

  const [subjectsNumber, setSubjectsNumber] = useState(() => {
    const array = [];
    if (levelData) {
      for (let i = 0; i < levelData.subjects.length; i++) {
        array.push(i);
      }
    }

    return array;
  });
  const [hasDepartments, setHasDepartments] = useState(levelData ? levelData.hasDepartments : 0);

  const deleteLevelField = (value) => {
    setSubjectsNumber(() =>
      subjectsNumber.filter((item, index) => item !== value)
    );
  };

  /**
   * render all the subjects
   */
  let renderSubjects = subjectsNumber.map((value, index) => (
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
      subject={levelData ? levelData.subjects[index] : null}
      professors={professors}
    />
  ));

  /**
   * @param {*} e
   * handle radio change of has departments
   */
  const handleSelectChange = (e) => {
    setValue(`levels.${level}.hasDepartments`, e.target.value);
    setHasDepartments(parseInt(e.target.value));
  };

  const checkLevelHasDepartment = () => levelData.hasDepartments ? 1 : 0;


  return (
    <Grid style={activeLevel !== level ? { display: "none" } : {}}>
      <Grid>
        <FormControl>
          <FormLabel>Has Departments ?</FormLabel>
          <Select
            name={`levels.${level}.hasDepartments`}
            defaultValue={levelData ? checkLevelHasDepartment : 0}
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
            setSubjectsNumber([
              ...subjectsNumber,
              subjectsNumber.length === 0
                ? 0
                : subjectsNumber[subjectsNumber.length - 1] + 1,
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
