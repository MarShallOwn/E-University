import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { GiBookCover } from 'react-icons/gi'
import { MdPerson } from 'react-icons/md'

const Professor = () => {

    return(
        <Grid>
            <Grid container justify="center" alignItems="center" style={{height: 'calc(100vh - 3.5rem)'}}>
                <Link to="/professor/subjects" style={{marginRight: '50px', textDecoration: 'none'}}>
                    <Grid container justify="center" alignItems="center" style={{border: '1px solid black', height: '300px', width: '300px', borderRadius: '20px'}}>
                        <Grid style={{color: '#551a8b'}}>
                            <Grid container justify="center">
                                <GiBookCover style={{fontSize: '70px'}} />
                            </Grid>
                            <Grid container justify="center">
                                <p style={{margin: '0', fontSize: '25px'}}>Subjects</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Link>

                <Link to="/professor/students" style={{textDecoration: 'none'}}>
                    <Grid container justify="center" alignItems="center" style={{border: '1px solid black', height: '300px', width: '300px', borderRadius: '20px'}}>
                        <Grid style={{color: '#551a8b'}}>
                            <Grid container justify="center">
                                <MdPerson style={{fontSize: '70px'}} />
                            </Grid>
                            <Grid container justify="center">
                                <p style={{margin: '0', fontSize: '25px'}}>Students</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Link>
            </Grid>
        </Grid>
    )
}

export default Professor