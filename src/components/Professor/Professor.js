import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'

const Professor = () => {

    return(
        <Grid>
            <Link to="/professor/subjects">Subjects</Link>
            <br />
            <Link to="/professor/students">Students</Link>
        </Grid>
    )
}

export default Professor