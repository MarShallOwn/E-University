import React from 'react'
import { Grid, Collapse } from '@material-ui/core'
import { useStyles } from './styleColleges'

const CollegeCard = ({children, ...props}) => {

    const { cardOrder, direction, image, facultyName, handleMouseEnter, handleMouseLeave, collapseHover } = props

    const classes = useStyles();

    return(
        <Grid
        name={cardOrder}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={direction === "left" ? classes.leftCardContainer : classes.rightCardContainer}
      >
        <Grid className={classes.imageContainer}>
          <img src={image} className={classes.image} />
          <Collapse in={collapseHover[cardOrder]} className={classes.collapse}>
            <Grid className={classes.hoverContainer}>
              <Grid
                container
                alignItems="center"
                className={classes.hoverContentContainer}
              >
                <p className={classes.aboutTitle}>About</p>
                <p className={classes.aboutContent}>
                    {children}
                </p>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid style={{ textAlign: "center" }}>
          <div className={classes.yellowLine} />
          <p className={classes.collegeName}>{facultyName}</p>
          <div className={classes.yellowLine} />
        </Grid>
      </Grid>
    )
}

export default CollegeCard