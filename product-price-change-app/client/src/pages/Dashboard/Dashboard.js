import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import Lottie from 'react-lottie'
import animationData from '../../util/714-water-loader.json'
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const instance = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 10 seconds before timing out
instance.defaults.timeout = 10000;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const useAPI = (url, setDelta) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});


  useEffect(() => {
    instance.get(
      url,
    ).then(result => {
      setData(result.data)
      setDelta(result.data.currentDelta)
      setIsLoading(false)
    }, (error) => {
      setError(error);
      setIsLoading(false);
    })
  }, [])
  return { data, isLoading, error }
}



const Dashboard = (props) => {
  let url = props.location.search;
  let params = queryString.parse(url);
  const classes = useStyles();
  const [isDisabled, setIsDisabled] = useState(true);
  
  const [delta, setDelta] = useState(undefined);
  const [newDelta, setNewDelta] = useState(undefined);
  const baseURI = `http://localhost:8080/api`
  const { data, error, isLoading } = useAPI(`${baseURI}/dashboard?instance=${params.instance}`, setDelta);
  

  
  const addDeltaToCount = async (newDelta) => {
    const res = await instance.post(`${baseURI}/buyers-count?instance=${params.instance}`, {delta: newDelta})
    console.log(res.data)
    setDelta(res.data.currentDelta)
    
}
  
  if (isLoading) {
    return (
      <Lottie options={defaultOptions}
        height={3000}
        width={300}
      />
    )
  } else if (error) {
    return (<div>{JSON.stringify(error)}</div>);

  } else {


    return (
      <Container>
        <div className={classes.root}>
          <div className='header'>
            <Typography variant="h3" component="h2" style={{ marginBottom: "60px" }}>
              <strong>{data.siteInfo.site.siteDisplayName}</strong> |  Products Buyers Count
              <Typography variant="h5" component="h4"  >
                <br />
                This app will display customers count in a product page
                <br />
              </Typography>
            </Typography>
            <Box className="input-box">
            <div className='delta-container'>
              Fake Your buyers count
              <br />
              <Switch label="Enable Delta" onChange={() => setIsDisabled(!isDisabled)} />
            </div>
            <div className='input-container'>
              <TextField disabled={isDisabled} type='number' onChange={(e) => setNewDelta(e.target.value) } id="outlined-basic" label={delta} variant="outlined" />
              &nbsp; &nbsp;
              <Button disabled={isDisabled} onClick={async () => await addDeltaToCount(newDelta)} variant="contained">Submit</Button>
            </div>
            </Box>
          </div>
        </div>
      </Container>
    );
  }
};

export default Dashboard;