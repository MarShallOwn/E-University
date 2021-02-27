import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles( theme => ({
    table: {
        "& table": {
            border: '1px solid black',
            borderCollapse: 'collapse',
            width: '100%',
          },
          "& th td": {
            border: '1px solid black',
            textAlign: 'left',
            padding: '8px',
          },
          "& td": {
              textAlign: 'center',
          }
    },
    studentRow: {
      cursor: 'pointer',
      "&:hover": {
        backgroundColor: 'rgba(28, 96, 179, 0.2)',
      }
    }
}))