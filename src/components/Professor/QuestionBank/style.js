import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles( theme => ({
    activeQuestionType: {
        height: '10rem',
        width: '11rem',
        borderRadius: '10px',
        backgroundColor: '#F1F8FF',
        borderStyle: 'none',
        margin: '0 1rem',
        cursor: 'pointer'
    },
    questionType: {
        height: '10rem',
        width: '11rem',
        border: '1px solid #5889C4',
        borderRadius: '10px',
        backgroundColor: 'white',
        margin: '0 1rem',
        cursor: 'pointer'
    }
}))