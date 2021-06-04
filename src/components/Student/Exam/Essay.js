import React from 'react'
import { Grid, TextField } from '@material-ui/core'

const Essay = props => {

    const {
        editAnswer,
        questionId,
        darkMode
      } = props;

    return(
        <Grid style={{marginTop: '1.5rem'}}>
                  <TextField onChange={(e) => editAnswer(e, questionId)} rows={10} variant="outlined" multiline style={darkMode? {backgroundColor: '#25292d', width: '100%'}:{backgroundColor: 'white', width: '100%'}}     InputProps={{
        style: darkMode ?{
            color: "#bebec0"
        } : {}
    }} />
        </Grid>
    )
}

export default Essay