import React from 'react';
import { Grid, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import Conditions from './Conditions'

const ExamCondition = props => {

    const { chaptersNumber, examChapter, setExamChapter, shortEssay, setShortEssay, longEssay, setLongEssay, chooseCorrectAnswer, setChooseCorrectAnswer, chooseMultipleCorrectAnswers, setChooseMultipleCorrectAnswers, trueOrFalse, setTrueOrFalse, conditions, setConditions } = props

    return(
        <Grid style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <p style={{font: 'normal normal normal 20px/30px Poppins', color: '#1C60B3', width: '100%'}}>Which chapters are included in the Exam ?</p>
            <Grid>
            {
        Array(chaptersNumber).fill(null).map((chapter, index) => (
          <FormControlLabel
          style={index === 0 ? {marginRight: '1rem'} : {margin: '0 1rem', }}
          key={Math.random()}
          control={
            <Checkbox
              checked={examChapter[index+1]}
              onChange={(e) =>
                setExamChapter({
                  ...examChapter,
                  [e.target.name]: e.target.checked,
                })
              }
              name={index+1}
            />
          }
          label={`Chapter ${index+1}`}
        />
        ))
      }
            </Grid>
            <p style={{font: 'normal normal normal 20px/30px Poppins', color: '#1C60B3', width: '100%', marginTop: '3rem'}}>How many points do you want for each question ?</p>
        <TextField
          value={shortEssay}
          onChange={(e) => setShortEssay(parseInt(e.target.value))}
          variant="outlined"
          size="small"
          style={{ width: '18%', margin: '1.5rem 0' }}
          label="Short Essay"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 15 } }}
        />
        <TextField
          value={longEssay}
          onChange={(e) => setLongEssay(parseInt(e.target.value))}
          variant="outlined"
          size="small"
          style={{ width: '18%', margin: '1.5rem 0' }}
          label="Long Essay"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 15 } }}
        />
        <TextField
          value={chooseCorrectAnswer}
          onChange={(e) => setChooseCorrectAnswer(parseInt(e.target.value))}
          variant="outlined"
          size="small"
          style={{ width: '18%', margin: '1.5rem 0' }}
          label="Choose Correct Answer"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 5 } }}
        />
        <TextField
          value={chooseMultipleCorrectAnswers}
          onChange={(e) =>
            setChooseMultipleCorrectAnswers(parseInt(e.target.value))
          }
          variant="outlined"
          size="small"
          style={{ width: '18%', margin: '1.5rem 0' }}
          label="Choose Multiple Correct Answers"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 5 } }}
        />
        <TextField
          value={trueOrFalse}
          onChange={(e) => setTrueOrFalse(parseInt(e.target.value))}
          variant="outlined"
          size="small"
          style={{ width: '18%', margin: '1.5rem 0' }}
          label="True or False"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 5 } }}
        />
        <p style={{font: 'normal normal normal 20px/30px Poppins', color: '#1C60B3', width: '100%', marginTop: '3rem'}}>Select Condition</p>
        <Conditions conditions={conditions} setConditions={setConditions} />
        </Grid>
    )
}


export default ExamCondition;