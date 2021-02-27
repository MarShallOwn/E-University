import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'
import axios from 'axios'

const DeleteUser = props => {

    const user = props.location.state.user;

    const handleDeleteUser = () => {
        axios.post("/api/adminDeleteUser", { id: user._id }, { withCredentials: true })
        .then(res => res.data.pass && props.history.push("/admin/users-list"))
    }

    return(
        <Grid>
                  <Grid
        style={{ width: "500px", margin: "20px auto 0 auto" }}
      >
        <Grid style={{ width: "100%" }}>
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              display: "block",
              margin: "0 auto 20px auto",
            }}
            src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${user.picture}`}
          />
        </Grid>
        <Grid style={{textAlign: 'center'}}>
            <p style={{font: 'normal normal bold 20px/20px Poppins'}}>Are you Sure you want to delete this user ?</p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>First Name: <span style={{fontWeight: '500'}}>{user.firstname}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Last Name: <span style={{fontWeight: '500'}}>{user.lastname}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Email: <span style={{fontWeight: '500'}}>{user.email}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>National ID: <span style={{fontWeight: '500'}}>{user.nationalID}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Phone Number: <span style={{fontWeight: '500'}}>{user.phoneNumber}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Faculty: <span style={{fontWeight: '500'}}>{user.faculty}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Level: <span style={{fontWeight: '500'}}>{user.level}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Department: <span style={{fontWeight: '500'}}>{user.department}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Street: <span style={{fontWeight: '500'}}>{user.street}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>City: <span style={{fontWeight: '500'}}>{user.city}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Is Professor: <span style={{fontWeight: '500'}}>{user.isProf ? "true" : "false"}</span></p>

          <Grid container justify="center">
                <Grid container justify="space-between" style={{width: '230px'}}>
                    <Link to="/admin/users-list" style={{textDecoration: 'none'}}>
                        <Button variant="contained">Cancel</Button>
                    </Link>
                    <Button variant="contained" color="secondary" onClick={handleDeleteUser}>Delete</Button>
                </Grid>
          </Grid>
        </Grid>
      </Grid>
        </Grid>
    )
}

export default DeleteUser;