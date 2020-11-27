import React from 'react'
import _ from 'lodash/fp'
import {Grid, TextField, Button} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Axios from 'axios'

const CreateUser = props => {

    const {register, handleSubmit, errors} = useForm()

    const storeUser = data => {
        Object.keys(data).map(k => data[k] = typeof data[k] == 'string' ? data[k].trim() : data[k]);
        Axios.post('/api/storeUser', {data})
        .then(res => res.data.status === 200 && props.history.push('/home'))
    }

    return(
        <Grid container alignItems="center" direction="column">
            <TextField name="firstname" id="firstname" label="Firstname" inputRef={register({
                required: true
            })} required />
            {_.get("firstname.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            <TextField name="lastname" id="lastname" label="Lastname" inputRef={register({
                required: true
            })} required />
            {_.get("lastname.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            <TextField type="number" name="nationalID" id="nationalID" label="National ID" onInput = {(e) =>{
        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,14)
    }} inputRef={register({
                required: true,
                minLength: 14,
                maxLength: 14
            })} required />
            {_.get("nationalID.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            {(_.get("nationalID.type", errors) === "minLength" || _.get("nationalID.type", errors) === "maxLength") && (
                <p>This field should be 14-digits</p>
            )}
            <TextField name="faculty" id="faculty" label="Faculty" inputRef={register({
                required: true
            })} required />
            {_.get("faculty.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            <TextField type="number" name="level" id="level" label="Level" onInput = {(e) =>{
        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
    }} inputRef={register({
                required: true,
            })} required />
            {_.get("level.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            <TextField name="department" id="department" label="Department" inputRef={register({
                required: true
            })} required />
            {_.get("department.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            <Button style={{marginTop: '2rem'}} variant="contained" color="primary" onClick={handleSubmit(storeUser)}>
                Primary
            </Button>
        </Grid>
    )
}

export default CreateUser