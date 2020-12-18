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
        <Grid>
          <p>First Name: {student.firstname}</p>
          <p>Last Name: {student.lastname}</p>
          <p>Email: {student.email}</p>
          <p>Phone Number: {student.phoneNumber}</p>
          <p>Faculty: {student.faculty}</p>
          <p>Level: {student.level}</p>
          <p>Department: {student.department}</p>
          <p>Street: {student.street}</p>
          <p>City: {student.city}</p>
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
