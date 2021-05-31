import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { FaRegCheckCircle } from 'react-icons/fa'

const ExamStructureDone = () => {


    return(
        <Grid style={{display: 'flex', alignItems:"center", justifyContent: 'center', flexWrap: 'wrap'}}>
            <FaRegCheckCircle fontSize="7rem" color="#1C60B3" style={{width: '100%'}} />
            <p style={{width: '100%', textAlign: 'center', font: 'normal normal normal 30px/46px Poppins'}}>Exam structure is done</p>
        </Grid>
    )
}


export default ExamStructureDone;