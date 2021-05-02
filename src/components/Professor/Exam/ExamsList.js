import React, { useEffect, useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import Axios from 'axios'

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
        <Grid>
            <Button variant="contained" color="primary" onClick={addExam}>Add Exam</Button>
            {
                result.exams.map((exam, index) => (
                    <Grid key={index}>
                       exam name: {exam.examName} 
                       exam type: {exam.type}
                       exam duration: {exam.duration}
                       exam start time: {exam.examDate}
                       exam end time: {exam.examEndTime}
                       <Button variant="contained" onClick={handleExamEdit} id={exam._id}>Edit</Button>
                       <Button variant="contained" onClick={handleExamDelete} id={exam._id}>Delete</Button>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default ExamsList