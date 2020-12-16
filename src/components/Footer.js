import React from 'react'
import { Grid } from '@material-ui/core'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { useStyles } from './FooterStyle'

const Footer = () => {

  const classes = useStyles()

  return (
    <Grid className={classes.footer}>
      <Grid
        style={{
          position: "relative",
          bottom: "10px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <p
          style={{
            position: "absolute",
            left: "146px",
            font: "normal normal 300 24px/35px Poppins",
            color: "white",
          }}
        >
          B.S University
        </p>

        <ul style={{ color: "red", position: "absolute", right: "274px" }}>
          <li>
            <a href="#home">About</a>
          </li>
          <li>
            <a href="#news">colleges</a>
          </li>
          <li>
            <a href="#contact">Contact us</a>
          </li>
          <li>
            <a href="#contact">Privacy</a>
          </li>
          <li>
            <a href="#contact">Terms</a>
          </li>
        </ul>

        <Grid style={{ position: "absolute", right: "98px" }}>
          <FaTwitter
            cursor="pointer"
            color="white"
            fontSize="1.1rem"
            style={{ marginRight: "24px" }}
          />
          <FaFacebookF cursor="pointer" color="white" fontSize="1.1rem" />
        </Grid>
      </Grid>

      <p
        style={{
          position: "absolute",
          bottom: "2px",
          right: "605px",
          color: "#DDDDDD",
          font: "normal normal normal 12px/19px Poppins",
        }}
      >
        Copyright 2020 © B.S.University
      </p>
    </Grid>
  );
};

export default Footer;
