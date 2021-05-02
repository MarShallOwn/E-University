import react, { useState } from 'react'
import { Grid, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'

const TrueOrFalse = props => {

    const {correctAnswer, setCorrectAnswer, buttonDisabled} = props
    
    return(
        <Grid>
            True Or False
            <Grid>
            <RadioGroup value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)}>
                <FormControlLabel value="True" control={<Radio disabled={buttonDisabled} />} label="True" />
                <FormControlLabel value="False" control={<Radio disabled={buttonDisabled} />} label="False" />
            </RadioGroup>
            </Grid>
        </Grid>
    )
}

export default TrueOrFalse