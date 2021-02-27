import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import Axios from 'axios'

const Subjects = props => {

    const [levels, setLevels] = useState([])

    useEffect(() => {
        Axios.get("/api/professorSubjects")
        .then(res => setLevels(res.data.subjects))
      }, [])

      console.log(levels);

    const handleClick = e => {
        let subject;
        let levelNumber;
        
        for(let level of levels){
            subject = level.subjects.find( subject => subject._id === e.currentTarget.id )
            
            
            if(subject){
                levelNumber = level.level;
            } break;
        }

        props.history.push({
            pathname : '/professor/subject',
            state : { subjectId: subject._id, level : levelNumber }
        })
    }

    return(
        <Grid>
            {
                levels.map((level, index) => (
                    <Grid key={index} style={{marginLeft: '10px'}}>
                        <p>Level {level.level}</p>
                        {
                        level.subjects.map((subject, index) => (
                            <Grid onClick={handleClick} container alignItems="center" justify="center" key={index} id={subject._id} style={{margin: '20px 0', width: '300px', height: '50px', marginLeft: '20px', border: '1px solid black', borderRadius: '10px'}}>
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