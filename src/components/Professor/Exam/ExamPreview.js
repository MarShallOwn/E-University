import React from 'react';
import { Grid, TextField } from '@material-ui/core';

const ExamPreview = () => {


    return(
        <Grid style={{display: 'flex', }}>
            <TextField style={{width: '40%'}} />
            <TextField style={{width: '40%'}} />
        </Grid>
    )
}


export default ExamPreview;