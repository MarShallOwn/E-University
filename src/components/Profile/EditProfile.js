import React, { useState } from 'react'
import _ from 'lodash/fp'
import {Grid, TextField, Button} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useLoggedIn, useUser } from '../../contexts/UserProvider'
import Axios from 'axios'

const EditProfile = props => {

    const { cancelUpdate, setShowEditProfile } = props

    const user = useUser()
    const setLoggedIn = useLoggedIn()

    const {register, handleSubmit, errors, watch} = useForm()

    const registerUser = data => {
        Axios.post('/api/updateProfile', {data}, { withCredentials: true })
        .then(res => {
            if(res.data.pass){
                setLoggedIn(false)
                setShowEditProfile(false)
            }
        })
    }

    return(
        <Grid container alignItems="center" direction="column">
            <TextField name="street" id="street" label="Street" defaultValue={user.street} inputRef={register()} />
            <TextField name="city" id="city" label="City" defaultValue={user.city} inputRef={register({
                required: true
            })} />
            {_.get("city.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            <TextField name="phoneNumber" id="phoneNumber" label="Phone Number" defaultValue={user.phoneNumber} inputRef={register({
                required: true,
                pattern: /^[0-9]*$/,
                maxLength: 11,
                minLength: 11
            })} />
            {_.get("phoneNumber.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            {_.get("phoneNumber.type", errors) === "pattern" && (
                <p>This field must be digits only</p>
            )}
            {(_.get("phoneNumber.type", errors) === "minLength" || _.get("phoneNumber.type", errors) === "maxLength") && (
                <p>This field should be 11-digits</p>
            )}

            <Grid>
                <Button style={{marginTop: '2rem'}} variant="contained" onClick={() => cancelUpdate("profile")}>
                    Cancel
                </Button>
                <Button style={{margin: '2rem 0 0 .5rem'}} variant="contained" color="primary" onClick={handleSubmit(registerUser)}>
                    Update
                </Button>
            </Grid>

        </Grid>
    )
}

export default EditProfile