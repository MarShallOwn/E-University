import React, {useEffect, useState} from 'react'
import _ from 'lodash/fp'
import {Grid, TextField, Button} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Axios from 'axios'

const ContinueRegister = props => {

    const {register, handleSubmit, errors, watch} = useForm()

    const [showError, setShowError] = useState({error: false, reason: null})

    useEffect(() => {
        if(!props.location.state || !props.location.state.continue){
            props.history.push('/register')
        }

    }, [props.location.state, props.history])

    const registerUser = data => {
        Object.keys(data).map(k => data[k] = typeof data[k] == 'string' ? data[k].trim() : data[k]);
        data = {...data, nationalID: props.location.state.nationalID}
        Axios.post('/api/continueRegister', {data})
        .then(res => res.data.pass ? props.history.push('/register-complete') : setShowError({error: true, reason: res.data.reason}))
    }

    return(
        <Grid container alignItems="center" direction="column">
            { showError.error && (
                showError.reason === "email" ? <p>Already Registered</p> : <p>No user found</p>
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
                minLength: 8
            })} required />
            {_.get("password.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            {_.get("password.type", errors) === "minLength" && (
                <p>password shouldn't be less than 8 characters</p>
            )}
            <TextField type="password" name="confirmPassword" id="confirmpassword" label="Confirm Password" inputRef={register({
                required: true,
                validate: value => value === watch('password'),
            })} required />
            {_.get("confirmPassword.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            {_.get("confirmPassword.type", errors) === "validate" && (
                <p>confirm password doesn't match password</p>
            )}
            <TextField name="street" id="street" label="Street" inputRef={register()} />
            <TextField name="city" id="city" label="City" inputRef={register({
                required: true
            })} required />
            {_.get("city.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            <TextField name="phoneNumber" id="phoneNumber" label="Phone Number" inputRef={register({
                required: true,
                pattern: /^[0-9]*$/,
                maxLength: 11,
                minLength: 11
            })} required />
            {_.get("phoneNumber.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            {_.get("phoneNumber.type", errors) === "pattern" && (
                <p>This field must be digits only</p>
            )}
            {(_.get("phoneNumber.type", errors) === "minLength" || _.get("phoneNumber.type", errors) === "maxLength") && (
                <p>This field should be 11-digits</p>
            )}
            <Button style={{marginTop: '2rem'}} variant="contained" color="primary" onClick={handleSubmit(registerUser)}>
                Primary
            </Button>

        </Grid>
    )
}

export default ContinueRegister