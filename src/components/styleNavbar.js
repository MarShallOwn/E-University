import { makeStyles } from '@material-ui/core'


export const useStyles = makeStyles( theme => ({
    root: {
        backgroundColor: '#1C60B3',
        padding: '0',
        margin: '0',
        height: '3.5rem',
        '& ul': {
            margin: '0',
            padding: '0 3.3rem 0 5rem',
            listStyleType: 'none',
            display: 'flex',
            height: '100%',
        },
        '& li': {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            cursor: 'pointer',
            margin: '0 1.7rem',
        },
        '& span': {
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'yellow',
            height: '5px',
            width: '100%'
        },
        '& a': {
            display: 'block',
            textDecoration : 'none',
            color: 'white',
            fontSize: '1.15rem',
        }
    },
    universityName: {
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: 'white'
    },
    profileContainer: {
        width: '8rem',
        display: 'flex',
        alignItems: 'center',
        '& li': {
            margin: '0 .5rem',
        },
    }
}))