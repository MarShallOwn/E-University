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
import {SiMicrosoftpowerpoint, SiMicrosoftword} from "react-icons/si";
import { AiFillFilePdf } from "react-icons/ai";
import Axios from "axios";

const Lecture = (props) => {
  const { handleDeleteLecture, level, subjectId, lecture, setSubject } = props;

  const [newMaterial, setNewMaterial] = useState({
    type: "file",
    name: null,
    file: null,
    link: null,
  });

  const createMaterial = () => {

    console.log(newMaterial.file);
    const formData = new FormData();
    formData.append("myFile", newMaterial.file);
    formData.append("newMaterial", JSON.stringify(newMaterial));
    formData.append("level", JSON.stringify(level));
    formData.append("subjectId", JSON.stringify(subjectId));
    formData.append("lecture", JSON.stringify(lecture));

    const headers = {
      "Content-Type": 'application/x-www-form-urlencoded',
    };

    Axios.post("/api/professor/lecture/create-material", formData, headers)
    .then(res => res.data.pass && setSubject(res.data.subject))
  }

  const handleDeleteMaterial = e => {
    Axios.post("/api/professor/lecture/delete-material", { materialId: e.currentTarget.value, level, subjectId, lecture })
    .then(res => res.data.pass && setSubject(res.data.subject))
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
              Lecture: {lecture.lectureNumber}
            </p>
            <MdDelete
              id={lecture.lectureNumber}
              onClick={handleDeleteLecture}
            />
          </Grid>
        </AccordionSummary>
        <AccordionDetails style={{display: 'block'}}>
          <Grid container>
            {lecture.materials.map((material, index) => 
            <Grid key={index}>
              
              <MdDelete id={material._id} onClick={handleDeleteMaterial} />
              {
                material.type === "video" ?
                <>
                <p>{material.name}</p>
                <iframe
                style={{ borderRadius: "10px", border: "none" }}
                width="200"
                height="200"
                webkitallowfullscreen
                mozallowfullscreen
                allowFullScreen
                src={material.link}
              ></iframe>
              </> :
              <Grid style={{border: '1px solid black'}}>
                <a href={`https://res.cloudinary.com/dxkufsejm/${material.extension === "pdf" ? 'image' : 'raw'}/upload/fl_attachment/v1601325837/${material.file}`} download>{icons[material.extension]} {material.name}.{material.extension}</a>
                </Grid>

              }
              </Grid>
            )}
            </Grid>

          <Grid style={{display: 'block'}}>
            <Grid>
              <FormControl component="fieldset">
                <FormLabel component="legend">Material Type</FormLabel>
                <RadioGroup
                  row
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
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
                size="small"
                required
                onChange={(e) => {
                  setNewMaterial({...newMaterial, name: e.target.value});
                }}
              />
            </Grid>

            <Grid>
              {newMaterial.type === "video" ? (
                <TextField
                  label="Video Link"
                  value={newMaterial.link}
                  required
                  onChange={(e) => {
                    setNewMaterial({...newMaterial, link: e.target.value});
                  }}
                />
              ) : (
                <input type="file" onChange={e => setNewMaterial({...newMaterial, file: e.target.files[0]})} required />
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


const icons = {
  pdf: <AiFillFilePdf />,
  pptx: <SiMicrosoftpowerpoint />,
  docx: <SiMicrosoftword />,
  doc: <SiMicrosoftword />
}