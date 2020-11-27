import React, { useState, useEffect } from 'react'
import _ from 'lodash/fp'
import {Grid, TextField, Button} from '@material-ui/core'
import { useUser } from '../contexts/UserProvider'
import { useForm } from 'react-hook-form'
import Axios from 'axios'

const Register = props => {

    const user = useUser()

    useEffect(() => {
        user && props.history.push("/")
    }, [user, props.history])

    const [showError, setShowError] = useState({error: false, reason: null})

    const {register, handleSubmit, errors} = useForm()

    const registerUser = data => {
        data = {nationalID: data.nationalID.trim()}
        Axios.post('/api/registerUser', {data})
        .then(res => res.data.status === 200 ? props.history.push({
            pathname: '/continue-register',
            state: {continue: res.data.continue, nationalID: data.nationalID}
        }) : setShowError({error: true, reason: res.data.reason}))
    }


    return(
        <Grid container alignItems="center" direction="column">
            { showError.error && (
                showError.reason === "email" ? <p>Already Registered</p> : <p>No user found</p>
            )}
            <TextField name="nationalID" id="nationalID" label="National ID" onInput = {(e) =>{
        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,14)
    }} inputRef={register({
                required: true
            })} required />
            {_.get("nationalID.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            <Button style={{marginTop: '2rem'}} variant="contained" color="primary" onClick={handleSubmit(registerUser)}>
                Primary
            </Button>
        </Grid>
    )
}

export default Register