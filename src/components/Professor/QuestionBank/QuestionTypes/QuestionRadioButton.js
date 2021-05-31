import React from 'react'
import {Grid, Button, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

const QuestionRadioButton = props => {

    const {correctAnswer, answers, setCorrectAnswer, setAnswers, buttonDisabled} = props

    console.log(correctAnswer);

    // remove answer and removes correct answer if exists
    const removeAnswer = e => {
        let tempAnswers = answers;
  
        // removes the answer and the correct answer if it exists
        setAnswers(tempAnswers.filter(answer => {
          if(answer !== e.currentTarget.name){
            return answer;
          }
          else{
            setCorrectAnswer("");
            return;
          }
        } ));
  
      }

    return(
        <Grid>
        <RadioGroup value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)} style={buttonDisabled ? {display: 'flex', flexDirection: 'row'} : {}}> 
            {
            answers.map((answer, index) => (
                <div>
                    <FormControlLabel key={index} value={answer} control={<Radio disabled={buttonDisabled} />} label={answer} />
                    {!buttonDisabled && <Button name={answer} onClick={removeAnswer}>Delete</Button>}
                </div>
            ))
            }
        </RadioGroup>
        </Grid>
    )
}

export default QuestionRadioButton