import React, { useState } from "react";
import {
  Grid
} from "@material-ui/core";
import _ from "lodash/fp";
import { MdAdd } from "react-icons/md";
import Subject from "./Subject";

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
    hasDepartments,
    setValue = { setValue },
  } = props;

  const [subjectsNumber, setSubjectsNumber] = useState(() => {
    const array = [];
    if (levelData) {
      for (let i = 0; i < levelData.subjects.length; i++) {
        array.push(i);
      }
    }

    return array;
  });

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

  return (
    <Grid style={activeLevel !== level ? { display: "none" } : {}}>
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
