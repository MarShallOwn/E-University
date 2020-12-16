import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles( theme => ({
    table: {
        "& table": {
            borderCollapse: 'collapse',
            width: '100%',
          },
          "& th td": {
            textAlign: 'left',
            padding: '8px',
          }
    }
}))