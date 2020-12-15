import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    footer: {
        position: 'relative',
        height: '7rem',
        backgroundColor: '#1C60B3',
        '& ul': {
            listStyleType: 'none',
            display: 'flex',
            height: '100%',
        },
        '& li': {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            margin: '0 1.7rem',
        },
        '& a': {
            display: 'block',
            textDecoration : 'none',
            color: 'white',
            fontSize: '14px',
            font: 'normal normal 300 14px/23px Poppins'
        }
    }
}))