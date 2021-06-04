import React from "react";
import {
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";


const QuestionRadioButton = (props) => {
  const {
    userAnswer,
    answers,
    editAnswer,
    questionId,
    darkMode
  } = props;

  return (
    <Grid style={{marginTop: '1.5rem'}}>
      <RadioGroup
        value={userAnswer}
        onChange={(e) => editAnswer(e, questionId)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {answers.map((answer, index) => (
          <div>
            <FormControlLabel
              style={darkMode ? {backgroundColor: '#25292d', margin: '.5rem 0', width: '40rem',color: '#bebec0', borderRadius: '7px'}:{backgroundColor: 'white', margin: '.5rem 0', width: '40rem', border: '.5px solid #7B7B7B', borderRadius: '7px'}}
              key={index}
              value={answer}
              control={<Radio style={darkMode ?{color:'#bebec0'} :{}} color="primary" />}
              label={answer}
            />
          </div>
        ))}
      </RadioGroup>
    </Grid>
  );
};

export default QuestionRadioButton;
