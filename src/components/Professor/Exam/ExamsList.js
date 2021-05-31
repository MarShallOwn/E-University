import React, { useEffect, useState } from 'react'
import { Grid, Button, TextField,
    InputAdornment } from '@material-ui/core'
  import Axios from 'axios'
  import { MdSearch } from 'react-icons/md'
  import { GrClose } from 'react-icons/gr';
  import { IoMdAddCircleOutline } from 'react-icons/io'
  import { IoDocumentTextOutline } from 'react-icons/io5'
  import moment from "moment";

const ExamsList = props => {

    const {subjectId, level} = props.location.state
    const [result, setResult] = useState({ exams : [] });

    useEffect(() => {
        Axios.post("/api/professor/exams-list", { subjectId, level }).then(
          (res) => res.data.pass && setResult(res.data.result)
        );
      },[]);


    const handleExamEdit = e => {
        props.history.push({
            pathname : '/professor/subject/exam',
            state : { subjectId, level, examId: e.currentTarget.id, chaptersNumber: result.chaptersNumber }
        })
    }

    const addExam = e => {
        props.history.push({
            pathname : '/professor/subject/exam',
            state : { subjectId, level, examId: null, chaptersNumber: result.chaptersNumber }
        })
    }

    const handleExamDelete = () => {
        
    }

    return(
        <Grid style={{ height: "calc(100vh - 3.5rem)" }}>
                        <Grid>
        <Grid
          style={{
            position: "relative",
            width: "fit-content",
            margin: "0 auto",
            padding: "0 13px",
          }}
        >
          <p
            style={{
              color: "#2C4563",
              textAlign: "center",
              fontSize: "35px",
              font: "normal normal 600 35px/53px Poppins",
            }}
          >
            Exams
          </p>
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "70px",
              height: "4px",
              backgroundColor: "#FFE05D",
            }}
          ></div>
        </Grid>
      </Grid>

      <Grid
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      <Grid
          style={{
            margin: "30px 0",
            width: "80%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="search exam"
            style={{ width: "40%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch color="#7A7A7A" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid style={{display: 'flex', alignItems: "center", flexDirection: 'column', width : '80%', border: '1px solid #1C60B3', borderRadius: '5px', padding: '5rem' }}>
            <Grid style={{display: 'flex', width: '100%'}}>
            {
                result.exams.map((exam, index) => (
                    <Grid key={index} onClick={handleExamEdit} id={exam._id} style={{height: '20rem', width: '20rem', backgroundColor: '#F1F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer', position: 'relative', margin: '1rem 2rem', borderRadius: '8px'}}>
                       <IoDocumentTextOutline fontSize="75px" color="#1C60B3" />
                       <Grid style={{textAlign: 'center'}}>
                       <p style={{font: 'normal normal 600 24px/0px Poppins', marginBottom: '0'}}>{exam.examName}</p><br />
                       <p style={{font: 'normal normal normal 16px/0px Poppins'}}>{moment(exam.examDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                       </Grid>
                       <GrClose style={{position: 'absolute', right: '25px', top: '30px'}} onClick={handleExamDelete} id={exam._id} fontSize="20px" />
                    </Grid>
                ))
            }
                    <Grid onClick={addExam} style={{height: '20rem', width: '20rem', backgroundColor: '#F1F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer', position: 'relative', margin: '1rem 2rem', borderRadius: '8px'}}>
                       <IoMdAddCircleOutline fontSize="75px" color="#1C60B3" />
                       <Grid style={{textAlign: 'center'}}>
                       <p style={{font: 'normal normal 600 21px/31px Poppins'}}>Add New Exam</p>
                       </Grid>
                    </Grid>
            </Grid>
        </Grid>
        </Grid>
        </Grid>
    )
}

export default ExamsList