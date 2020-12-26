import React, { useState } from "react";
import {
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import Axios from "axios";

const Lecture = (props) => {
  const { handleDeleteLecture, level, subjectId, lecture } = props;

  const [fileType, setFileType] = useState("file");
  const [newMaterial, setNewMaterial] = useState({
    type: fileType,
    name: null,
    fileName: null,
    link: null,
  });

  const createMaterial = () => {
    Axios.post("/api/professor/lecture/create-material", {
      newMaterial,
      level,
      subjectId,
      lecture
    })
    .then(res => res.data.pass && console.log(""))
  }

  return (
    <Grid>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid>
            <p style={{ display: "inline-block", marginRight: "2rem" }}>
              {lecture.lectureNumber}
            </p>
            <MdDelete
              id={lecture.lectureNumber}
              onClick={handleDeleteLecture}
            />
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>{lecture.materials.map(() => {})}</Grid>

          <Grid>
            <Grid>
              <FormControl component="fieldset">
                <FormLabel component="legend">Material Type</FormLabel>
                <RadioGroup
                  row
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                >
                  <FormControlLabel
                    value="file"
                    control={<Radio />}
                    label="File"
                  />
                  <FormControlLabel
                    value="video"
                    control={<Radio />}
                    label="Video"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid>
              <TextField
                variant="outlined"
                label="Name"
                value={newMaterial.name}
                required
                onChange={(e) => {
                  setNewMaterial({...newMaterial, name: e.target.value});
                }}
              />
            </Grid>

            <Grid>
              {fileType === "video" ? (
                <TextField
                  label="Video Link"
                  value={newMaterial.link}
                  required
                  onChange={(e) => {
                    setNewMaterial({...newMaterial, link: e.target.value});
                  }}
                />
              ) : (
                <input type="file" required />
              )}
            </Grid>
            <Grid>
              <Button variant="contained" color="primary" onClick={createMaterial}>
                Save
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default Lecture;
