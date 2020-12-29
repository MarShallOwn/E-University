import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles( theme => ({
    leftCardContainer: {
        display: 'inline-block',
        margin: '45px 46px 10px 0'
    },
    rightCardContainer: {
        display: 'inline-block',
        margin: '45px 0 10px 0'
    },
    imageContainer: {
        width: '565px',
        height: '390px',
        position: 'relative'
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: '10px'
    },
    yellowLine: {
        height: "4px",
        backgroundColor: "#FFE05D",
        width: '40px',
        display: 'inline-block',
        marginBottom: '7px'
    },
    collegeName: {
        color: '#2C4563',
        fontSize: '25px',
        font: 'normal normal 600 25px/38px Poppins',
        display: 'inline-block',
        margin: '15px 10px 0 10px'
    },
    collapse: {
        position: "absolute",
        bottom: "0",
    },
    hoverContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.64)",
        height: "166px",
        width: "564px",
    },
    hoverContentContainer: {
        width: '316px',
        marginLeft: '34px'
    },
    aboutTitle: {
        color: '#FFE05D',
        font: 'normal normal normal 18px/27px Poppins',
        marginBottom: '0'
    },
    aboutContent: {
        color: 'white',
        font: 'normal normal 300 16px/30px Poppins'
    }
}));