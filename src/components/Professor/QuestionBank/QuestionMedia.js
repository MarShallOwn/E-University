import React from 'react'
import { Grid, Button } from '@material-ui/core'

const QuestionMedia = props => {

    const { file, handleMediaDeletion, url, deleteDisabled, edit } = props;

    let media;
    if (file.type.includes("image")) {
         media = (<div name={file.name}>
            <img
              src={url}
              style={{ height: "150px", width: "250px" }}
            />
            { !deleteDisabled && <Button onClick={handleMediaDeletion} id={edit ? file._id : file.name}  name={edit ? "stored" : "newUpload"}>Delete</Button> }
          </div>
        );
      } else if (file.type.includes("video")) {
          
          media = (<div name={file.name}>
            <video
              src={url}
              style={{ height: "150px", width: "250px" }}
              controls
            />
            { !deleteDisabled && <Button onClick={handleMediaDeletion} id={edit ? file._id : file.name} name={edit ? "stored" : "newUpload"}>Delete</Button> }
          </div>
        );
      } else if (file.type.includes("audio")) {

          media = (<div name={file.name}>
            <audio
              src={url}
              style={{ height: "150px", width: "250px" }}
              controls
            />
            { !deleteDisabled && <Button onClick={handleMediaDeletion} name={file.name}>Delete</Button> }
          </div>
        );
      }


    return(
        <Grid style={{margin: '0 .7rem'}}>
        {media}
        </Grid>
    )
}

export default QuestionMedia