import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Pharmacy from "../assets/images/Pharmacy.jpeg";
import Engineering from "../assets/images/Engineering.jpeg";
import ComputerScience from "../assets/images/Computer-Science.jpeg";
import Literature from "../assets/images/Literature.jpeg";
import BusinessAdministration from "../assets/images/Business-Administration.jpeg";
import Media from "../assets/images/Media.jpeg";
import Footer from './Footer';

import CollegeCard from "./CollegeCard";

const Colleges = () => {

  const [collapseHover, setCollapseHover] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
    seventh: false,
    eighth: false,
  });

  console.log(collapseHover);

  const handleMouseEnter = (e) => {
    setCollapseHover({
      ...collapseHover,
      [e.currentTarget.getAttribute("name")]: true,
    });
  };

  const handleMouseLeave = (e) => {
    setCollapseHover({
      ...collapseHover,
      [e.currentTarget.getAttribute("name")]: false,
    });
  };

  return (
    <Grid style={{ height: "calc(100vh - 3.5rem)" }}>
      <Grid style={{ margin: "0 auto" }}>
        <p
          style={{
            fontSize: "35px",
            color: "#2C4563",
            font: "normal normal 600 35px/53px Poppins",
            textAlign: "center",
          }}
        >
          In B.S University
        </p>
        <p
          style={{
            fontSize: "20px",
            color: "#424446",
            font: "normal normal normal 20px/5px Poppins",
            textAlign: "center",
          }}
        >
          In B. S University , We have 8 faculties in all fields
        </p>
      </Grid>

      <Grid container justify="center" style={{ width: "100%", marginBottom: '103px' }}>
        <CollegeCard
          cardOrder="first"
          collapseHover={collapseHover}
          direction="left"
          image={"good"}
          facultyName="Faculty of medicine"
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        >
          Marc Tessier-Lavigne became Stanford University’s eleventh president
          on September 1, 2016.
        </CollegeCard>

        <CollegeCard
          cardOrder="second"
          collapseHover={collapseHover}
          direction="right"
          image={Pharmacy}
          facultyName="Faculty of pharmacy"
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        >
          Marc Tessier-Lavigne became Stanford University’s eleventh president
          on September 1, 2016.
        </CollegeCard>

        <CollegeCard
          cardOrder="third"
          collapseHover={collapseHover}
          direction="left"
          image={Engineering}
          facultyName="Faculty of engineering"
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        >
          Marc Tessier-Lavigne became Stanford University’s eleventh president
          on September 1, 2016.
        </CollegeCard>

        <CollegeCard
          cardOrder="fourth"
          collapseHover={collapseHover}
          direction="right"
          image={ComputerScience}
          facultyName="Faculty of computer science"
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        >
          Marc Tessier-Lavigne became Stanford University’s eleventh president
          on September 1, 2016.
        </CollegeCard>

        <CollegeCard
          cardOrder="fifth"
          collapseHover={collapseHover}
          direction="left"
          image={"good"}
          facultyName="Faculty of artificial intelligence"
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        >
          Marc Tessier-Lavigne became Stanford University’s eleventh president
          on September 1, 2016.
        </CollegeCard>

        <CollegeCard
          cardOrder="sixth"
          collapseHover={collapseHover}
          direction="right"
          image={Literature}
          facultyName="Faculty of literature"
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        >
          Marc Tessier-Lavigne became Stanford University’s eleventh president
          on September 1, 2016.
        </CollegeCard>

        <CollegeCard
          cardOrder="seventh"
          collapseHover={collapseHover}
          direction="left"
          image={BusinessAdministration}
          facultyName="Faculty of business administration"
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        >
          Marc Tessier-Lavigne became Stanford University’s eleventh president
          on September 1, 2016.
        </CollegeCard>

        <CollegeCard
          cardOrder="eighth"
          collapseHover={collapseHover}
          direction="right"
          image={Media}
          facultyName="Faculty of media"
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        >
          Marc Tessier-Lavigne became Stanford University’s eleventh president
          on September 1, 2016.
        </CollegeCard>
      </Grid>

      <Footer />
    </Grid>
  );
};

export default Colleges;

/*

        <Grid
          name="first"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={classes.leftCardContainer}
        >
          <Grid className={classes.imageContainer}>
            <img src={"good"} className={classes.image} />
            <Collapse in={collapseHover.first} className={classes.collapse}>
              <Grid className={classes.hoverContainer}>
                <Grid
                  container
                  alignItems="center"
                  className={classes.hoverContentContainer}
                >
                  <p className={classes.aboutTitle}>About</p>
                  <p className={classes.aboutContent}>
                    Marc Tessier-Lavigne became Stanford University’s eleventh
                    president on September 1, 2016.
                  </p>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <Grid style={{ textAlign: "center" }}>
            <div className={classes.yellowLine} />
            <p className={classes.collegeName}>Faculty of medicine</p>
            <div className={classes.yellowLine} />
          </Grid>
        </Grid>

*/
