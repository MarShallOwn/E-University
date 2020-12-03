import React, { useEffect } from 'react'
import _ from 'lodash'
import { Grid } from '@material-ui/core'
import { useUser } from '../contexts/UserProvider'

const Home = () => {

    const user = useUser()

    return(
        <Grid>
            {
            !_.isEmpty(user) && 
            <p>Welcome {user.isProf && "Dr. "} {user.firstname} {user.lastname}</p>
            }
            Home Page
        </Grid>
    )
}

export default Home