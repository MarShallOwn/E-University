import React, { useRef } from "react";
import { Grid, Button } from "@material-ui/core";
import { MdPrint } from "react-icons/md";
import ReactToPrint from "react-to-print";

const StudentDetails = (props) => {
  const student = props.location.state.student;

  const componentRef = useRef();

  return (
    <Grid>
      <Grid
        style={{ width: "500px", margin: "50px auto 0 auto" }}
        ref={componentRef}
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
            src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${student.picture}`}
          />
        </Grid>
        <Grid style={{textAlign: 'center'}}>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>First Name: <span style={{fontWeight: '500'}}>{student.firstname}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Last Name: <span style={{fontWeight: '500'}}>{student.lastname}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Email: <span style={{fontWeight: '500'}}>{student.email}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Phone Number: <span style={{fontWeight: '500'}}>{student.phoneNumber}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Faculty: <span style={{fontWeight: '500'}}>{student.faculty}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Level: <span style={{fontWeight: '500'}}>{student.level}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Department: <span style={{fontWeight: '500'}}>{student.department}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>Street: <span style={{fontWeight: '500'}}>{student.street}</span></p>
          <p style={{font: 'normal normal bold 16px/20px Poppins'}}>City: <span style={{fontWeight: '500'}}>{student.city}</span></p>
        </Grid>
      </Grid>

      <Grid style={{ width: "100%" }}>
        <ReactToPrint
          trigger={() => (
            <Button
              style={{ margin: "50px auto 0 auto", display: "block" }}
              color="primary"
              variant="contained"
            >
              Print
              <MdPrint style={{ marginLeft: "7px" }} />
            </Button>
          )}
          content={() => componentRef.current}
        />
      </Grid>
    </Grid>
  );
};

export default StudentDetails;
