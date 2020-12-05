import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash/fp'
import {Grid, TextField, Button} from '@material-ui/core'
import { useUser, useLoggedIn } from '../../contexts/UserProvider'
import { useForm } from 'react-hook-form'
import Axios from 'axios'

const Login = props => {

    const user = useUser()
    const setLoggedIn = useLoggedIn()

    useEffect(() => {
        if(user.email){
            props.location.search && props.history.push(props.location.search.split('=')[1])
        }
    }, [user, props.history, props.location.search])

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
        .then(res => {
            if( res.data.pass ){
                setLoggedIn(true)
                props.location.search ? props.history.push(props.location.search.split('=')[1]) : props.history.push("/")
            }else{
                setShowError({error: true, reason: 'email or password not correct'})
            }
        })
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
                Login
            </Button>
            <Link to="/auth/forgot-password">Forgot Password ?</Link>
        </Grid>
    )
}

export default Login