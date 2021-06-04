import React from "react";
import { Grid, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

const TrueOrFalse = (props) => {
  const {
    userAnswer,
    editAnswer,
    questionId,
    darkMode
  } = props;

  return (
    <Grid style={{marginTop: '1.5rem'}}>
      <Grid>
        <RadioGroup
          value={userAnswer}
          onChange={(e) => editAnswer(e, questionId)}
        >
          <FormControlLabel color="primary" style={darkMode ? {backgroundColor: '#25292d', margin: '.5rem 0', width: '40rem',color: '#bebec0', borderRadius: '7px'}:{backgroundColor: 'white', margin: '.5rem 0', width: '40rem', border: '.5px solid #7B7B7B', borderRadius: '7px'}} value="True" control={<Radio style={darkMode ?{color:'#bebec0'} :{}} />} label="True" />
          <FormControlLabel color="primary" style={darkMode ? {backgroundColor: '#25292d', margin: '.5rem 0', width: '40rem',color: '#bebec0', borderRadius: '7px'}:{backgroundColor: 'white', margin: '.5rem 0', width: '40rem', border: '.5px solid #7B7B7B', borderRadius: '7px'}} value="False" control={<Radio style={darkMode ?{color:'#bebec0'} :{}} />} label="False" />
        </RadioGroup>
      </Grid>
    </Grid>
  );
};

export default TrueOrFalse;
