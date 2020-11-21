import React, {useEffect} from 'react'
import {
  Grid
} from '@material-ui/core'
import Axios from 'axios'

const App = () => {

  useEffect(() => {
    Axios.get('/api/')
    .then(res => console.log(res.data))
  },[])

  return (
  <Grid>
    Home
  </Grid>
  );
}

export default App;
