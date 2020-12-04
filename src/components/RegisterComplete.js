import React, {useEffect} from 'react'
import { useUser } from '../contexts/UserProvider'
import {Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'

const RegisterComplete = props => {

    const user = useUser()

    useEffect(() => {
        user.email && props.history.push("/")
    }, [user, props.history])

    return(
        <Grid>
            Registeration Completed Successfully <Link to="/login">Login</Link>
        </Grid>
    )
}

export default RegisterComplete