import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import Axios from "axios";
import Lecture from "./Lecture";

const Subject = (props) => {
  const { subjectId, level } = props.location.state;

  const [subject, setSubject] = useState({ lectures: [] });
  const [newLecture, setNewLecture] = useState("");
  const [error, setError] = useState({ error: null, msg: "" });

  useEffect(() => {
    Axios.post("/api/professor/get-subject", { subjectId, level }).then(
      (res) => res.data.pass && setSubject(res.data.subject)
    );
  }, []);

  const handleSaveLecture = () => {
    if (
      !subject.lectures.find(
        (lecture) => lecture.lectureNumber === parseInt(newLecture)
      )
    ) {
      Axios.post("/api/professor/create-lecture", {
        newLecture: parseInt(newLecture),
        level,
        subject,
      }).then((res) => res.data.pass && setSubject(res.data.subject));
      setNewLecture("");
    } else {
      setError({ type: "lecture", msg: "Lecture already registered" });
    }
  };

  const handleDeleteLecture = (e) => {
    console.log(e.currentTarget.id);
    Axios.post("/api/professor/delete-lecture", {
      deleteLecture: parseInt(e.currentTarget.id),
      level,
      subject,
    }).then((res) => res.data.pass && setSubject(res.data.subject));
  };

  return (
    <Grid>
      <Grid>
        <p style={{ display: "inline-block" }}>Add Lecture: </p>
        <TextField
          variant="outlined"
          type="number"
          value={newLecture}
          required
          onChange={(e) => {
            e.target.value < 0
              ? setNewLecture("0")
              : setNewLecture(e.target.value);
          }}
        />
        {error.type === "lecture" && <p>{error.msg}</p>}
        <Button
          style={{ display: "block" }}
          variant="contained"
          color="primary"
          onClick={handleSaveLecture}
        >
          Save
        </Button>
      </Grid>

      {subject.lectures.length !== 0 &&
        subject.lectures
          .sort((a, b) => a.lectureNumber - b.lectureNumber)
          .map((lecture, index) => (
            <Lecture
            key={index}
              handleDeleteLecture={handleDeleteLecture}
              level={level}
              setSubject = {setSubject}
              subjectId={subject._id}
              lecture={lecture}
            />
          ))}
    </Grid>
  );
};

export default Subject;
