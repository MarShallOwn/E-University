import React from 'react'
import { Grid } from '@material-ui/core'

const CheckMail = () => {

    return(
        <Grid>
            <h2>Reset Password</h2>
            <p>An email has been sent to the address you have provided. <br />
            Please follow the link in the email to complete your password reset request</p>
        </Grid>
    )
}

export default CheckMail