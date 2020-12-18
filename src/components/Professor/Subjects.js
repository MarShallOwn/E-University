import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import Axios from 'axios'

const Subjects = () => {

    const [levels, setLevels] = useState([])

    useEffect(() => {
        Axios.get("/api/professorSubjects")
        .then(res => setLevels(res.data.subjects))
      }, [])

      console.log(levels);

    return(
        <Grid>
            {
                levels.map((level, index) => (
                    <Grid key={index}>
                        <p>Level {level.level}</p>
                        {
                        level.subjects.map((subject, index) => (
                            <Grid onClick={() => {}} container alignItems="center" key={index} id={subject._id} style={{margin: '20px 0', width: '300px', height: '50px', marginLeft: '20px', border: '1px solid black', borderRadius: '10px'}}>
                                <p>{subject.name}</p>
                            </Grid>
                        ))
                        }
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default Subjects