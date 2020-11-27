import React, { useEffect, useState } from 'react'
import _ from 'lodash/fp'
import {Grid, TextField, Button} from '@material-ui/core'
import { useUser } from '../contexts/UserProvider'
import { useForm } from 'react-hook-form'
import Axios from 'axios'

const Login = props => {

    const user = useUser()

    useEffect(() => {
        user && props.history.push("/")
    }, [user, props.history])

    const [showError, setShowError] = useState({error: false, reason: null})

    const {register, handleSubmit, errors} = useForm()

    const loginUser = data => {
        Axios.post('/api/login', {
            email: data.email,
            password: data.password
        },
        {
            withCredentials: true
        })
        .then(res => res.data.pass ? props.history.push('/') : setShowError({error: true, reason: 'email or password not correct'}))
    }

    return(
        <Grid container alignItems="center" direction="column">
            { showError.error && (
                <p>email or password not correct</p>
            )}
            <TextField type="email" name="email" id="email" label="E-mail" inputRef={register({
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}  required/>
            {_.get("email.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            {_.get("email.type", errors) === "pattern" && (
                <p>Please include an '@' in the email address and write the domain</p>
            )}
            <TextField type="password" name="password" id="password" label="Password" inputRef={register({
                required: true,
            })} required />
            {_.get("password.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            <Button style={{marginTop: '2rem'}} variant="contained" color="primary" onClick={handleSubmit(loginUser)}>
                Primary
            </Button>

        </Grid>
    )
}

export default Login