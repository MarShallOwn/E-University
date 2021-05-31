import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker,
  } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const ExamInformation = props => {

    const { examName, setExamName, examType, setExamType, timeCondition, durationHour, durationMin, durationSec, selectedStartExamDate, setSelectedStartExamDate, selectedEndExamDate, setSelectedEndExamDate } = props;

    return(
        <Grid style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <TextField value={examName} onChange={(e) => setExamName(e.target.value)} variant="outlined" label="Exam Name" size="small" style={{width: '40%', margin: '1.5rem 0'}} />
            <Grid variant="outlined" label="Exam Type" size="small" style={{width: '20%'}}></Grid>
            <FormControl variant="outlined" label="Exam Type" size="small" style={{width: '40%', margin: '1.5rem 0'}}>
              <InputLabel id="demo-simple-select-outlined-label">Exam Type</InputLabel>
              <Select
              defaultValue="RealExam"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                label="Exam Type"
              >
                <MenuItem value={"RealExam"}>Real Exam</MenuItem>
                <MenuItem value={"Test"}>Test</MenuItem>
              </Select>
            </FormControl>
            <Grid style={{width: '100%', margin: '1.5rem 0'}}></Grid>
            <Grid
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <p
            style={{
              color: "#1C60B3",
              font: "normal normal 600 18px/0px Poppins",
            }}
          >
            Duration
          </p>
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "50px",
              height: "4px",
              backgroundColor: "#FFE05D",
            }}
          ></div>
        </Grid>
            <TextField onChange={timeCondition} value={durationHour} type="number" name="hour" variant="outlined" label="hour" size="small" style={{width: '30%', margin: '1.5rem 0'}} />
            <TextField onChange={timeCondition} value={durationMin} type="number" name="min" variant="outlined" label="minute" size="small" style={{width: '30%', margin: '1.5rem 0'}} />
            <TextField onChange={timeCondition} value={durationSec} type="number" name="sec" variant="outlined" label="second" size="small" style={{width: '30%', margin: '1.5rem 0'}} />
            <Grid
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <p
            style={{
              color: "#1C60B3",
              font: "normal normal 600 18px/0px Poppins",
            }}
          >
            Exam Start
          </p>
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "50px",
              height: "4px",
              backgroundColor: "#FFE05D",
            }}
          ></div>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
        style={{width: '40%', margin: '1.5rem 0'}}
        inputVariant="outlined"
          margin="small"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedStartExamDate}
          onChange={(date) => setSelectedStartExamDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
        style={{width: '40%', margin: '1.5rem 0'}}
                inputVariant="outlined"
                margin="small"
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedStartExamDate}
          onChange={(date) => setSelectedStartExamDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </MuiPickersUtilsProvider>
        
        <Grid
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <p
            style={{
              color: "#1C60B3",
              font: "normal normal 600 18px/0px Poppins",
            }}
          >
            Exam End
          </p>
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "50px",
              height: "4px",
              backgroundColor: "#FFE05D",
            }}
          ></div>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
        style={{width: '40%', margin: '1.5rem 0'}}
        inputVariant="outlined"
          margin="small"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedEndExamDate}
          onChange={(date) => setSelectedEndExamDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
        style={{width: '40%', margin: '1.5rem 0'}}
        inputVariant="outlined"
          margin="small"
          id="time-picker"
          label="Time picker"
          value={selectedEndExamDate}
          onChange={(date) => setSelectedEndExamDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </MuiPickersUtilsProvider>
        </Grid>
    )
}


export default ExamInformation;