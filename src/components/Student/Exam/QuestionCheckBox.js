import React from "react";
import { Grid, Button, FormControlLabel, Checkbox } from "@material-ui/core";

const QuestionCheckBox = (props) => {
  const {
    answers,
    editAnswer,
    userAnswer,
    questionId,
    darkMode
  } = props;

  return (
    <Grid style={{ display: "flex", flexDirection :'column', marginTop: '1.5rem' }}>
      {answers.map((answer, index) => (
        <Grid>
          <FormControlLabel
              style={darkMode ? {backgroundColor: '#25292d', margin: '.5rem 0', width: '40rem', color: "#bebec0", borderRadius: '7px'} :{backgroundColor: 'white', margin: '.5rem 0', width: '40rem', border: '.5px solid #7B7B7B', borderRadius: '7px'}}
            key={index}
            control={
              <Checkbox
              color="primary"
              style={darkMode ?{color:'#bebec0'} :{}}
                checked={userAnswer[answer]}
                onChange={(e) => editAnswer(e, questionId)}
                name={answer}
              />
            }
            label={answer}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionCheckBox;
