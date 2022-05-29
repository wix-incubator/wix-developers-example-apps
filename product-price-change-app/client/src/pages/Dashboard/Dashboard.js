import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { useState, useEffect } from 'react';
import queryString from 'query-string';
import Lottie from 'react-lottie'
import animationData from '../../util/714-water-loader.json'
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const useItemStyles = makeStyles({
  root: {
    minWidth: 400,
    marginTop: "20px",
    marginRight: "20px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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

const useAPI = (url) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});


  useEffect(() => {
    instance.get(
      url,
    ).then(result => {
      setData(result.data)
      setIsLoading(false)
    }, (error) => {
      setError(error);
      setIsLoading(false);
    })
  }, [])
  return { data, isLoading, error }
}

const convertArrayToObject = (array, keyName) => {
  const initialValue = {};
  array.map((element, index) => {
    initialValue[`${keyName} ${index + 1}`] = element
  })
  return initialValue;
};


const Dashboard = (props) => {
  let url = props.location.search;
  let params = queryString.parse(url);
  const classes = useStyles();
  const { data, error, isLoading } = useAPI(`http://localhost:8080/api/dashboard?instance=${params.instance}`);

  if (isLoading) {
    return (
      <Lottie options={defaultOptions}
        height={300}
        width={300}
      />
    )
  } else if (error) {
    return (<div>{JSON.stringify(error)}</div>);

  } else {
  

    return (

      <div className={classes.root}>
        <Typography variant="h3" component="h2">
          <strong>{data.siteInfo.site.siteDisplayName}</strong> Products Buyers Count 
        </Typography>
        
        <Switch/>
        
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        
      </div>
    );
  }
};

export default Dashboard;