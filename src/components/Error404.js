import React from 'react'
import { Grid } from '@material-ui/core'
import { RiErrorWarningLine } from 'react-icons/ri'

const Error404 = () => {

    return(
      <Grid
        style={{
            height: "calc(100vh - 3.5rem)",
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
        }}
      >
          <Grid>
            <RiErrorWarningLine fontSize="15rem" color="#1C60B3" />
            <p style={{width: '100%', textAlign: 'center', font: 'normal normal normal 30px/46px Poppins'}}>Page Not Found</p>
            </Grid>
        </Grid>
    )
}

export default Error404;