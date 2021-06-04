import React from 'react'
import { Grid, Button, FormControlLabel, Checkbox } from '@material-ui/core'

const QuestionCheckBox = props => {
    
    const {answers, setAnswers, correctAnswers, setCorrectAnswers, buttonDisabled } = props

    const addAnswer = e => {
      // if the target is false then remove it and store only true
      if(!e.target.checked){
        const tempCorrectAnswers = {...correctAnswers};

        delete tempCorrectAnswers[e.target.name];

        setCorrectAnswers(tempCorrectAnswers)
      }
      else{
        setCorrectAnswers({...correctAnswers, [e.target.name]: e.target.checked})
      }
    }

    const removeAnswer = e => {
      let tempAnswers = answers;
      let tempCorrectAnswers = correctAnswers;

      // removes the answer and the correct answer if it exists
      setAnswers(tempAnswers.filter(answer => {
        if(answer !== e.currentTarget.name){
          return answer;
        }
        else{
          delete tempCorrectAnswers[answer]
          return;
        }
      } ));

    }

    return(
        <Grid style={buttonDisabled ? {display: 'flex'} : {}}>
        {answers.map((answer, index) => (
          <div>
          <FormControlLabel
          style={{font: 'normal normal 600 12px/25px Poppins'}}
          key={index}
            control={
              <Checkbox
              disabled={buttonDisabled}
                  checked={correctAnswers[answer]}
                onChange={addAnswer}
                name={answer}
              />
            }
            label={answer}
          />
          {!buttonDisabled && <Button name={answer} onClick={removeAnswer} variant="contained">Delete</Button>}
          </div>
        ))}
    </Grid>
    )
}

export default QuestionCheckBox