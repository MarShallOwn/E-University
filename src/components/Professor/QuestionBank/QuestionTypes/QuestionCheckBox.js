import React from 'react'
import { Grid, Button, FormControlLabel, Checkbox } from '@material-ui/core'

const QuestionCheckBox = props => {
    
    const {answers, setAnswers, correctAnswers, setCorrectAnswers, buttonDisabled } = props

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
        <Grid>
        {answers.map((answer, index) => (
          <div>
          <FormControlLabel
          key={index}
            control={
              <Checkbox
              disabled={buttonDisabled}
                  checked={correctAnswers[answer]}
                onChange={e => setCorrectAnswers({...correctAnswers, [e.target.name]: e.target.checked})}
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