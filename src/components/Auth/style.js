import { makeStyles } from '@material-ui/core'


export const useStyles = makeStyles( theme => ({
    root: {
        '& .MuiInputBase-root': {
            borderRadius: '10px'
        },
        '& .MuiButtonBase-root': {
            borderRadius: '10px'
        }
    },
}))