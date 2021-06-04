import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { BsCheckCircle } from 'react-icons/bs'

const ExamStructureDone = () => {


    return(
        <Grid style={{display: 'flex', alignItems:"center", justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem'}}>
            <BsCheckCircle fontSize="4rem" color="#1C60B3" style={{width: '100%'}} />
            <p style={{width: '100%', textAlign: 'center', font: 'normal normal normal 25px/46px Poppins', marginTop: '5px'}}>Exam structure is done</p>
        </Grid>
    )
}


export default ExamStructureDone;