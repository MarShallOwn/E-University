import React from 'react'
import { Grid } from '@material-ui/core'
import Axios from 'axios'

const Faculty = () => {

    useEffect(() => {
        Axios.get()
    })

    return(
        <Grid>
                    <Grid
        >
          <Grid
            style={{
              position: "relative",
              width: "fit-content",
              margin: "0 auto",
              padding: "0 13px",
            }}
          >
            <p
              style={{
                color: "#2C4563",
                textAlign: "center",
                fontSize: "35px",
                font: "normal normal normal 35px/53px Poppins",
              }}
            >
              Recommendations
            </p>
            <div
              style={{
                position: "absolute",
                left: "0",
                bottom: "0",
                width: "94px",
                height: "4px",
                backgroundColor: "#FFE05D",
              }}
            ></div>
          </Grid>
        </Grid>
        </Grid>
    )
}

export default Faculty