import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { useState, useEffect } from 'react';
import queryString from 'query-string';
import Lottie from 'react-lottie'
import animationData from '../../util/714-water-loader.json'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
  //console.log(props);
  let url = props.location.search;
  let params = queryString.parse(url);
  const classes = useStyles();
  const { data, error, isLoading } = useAPI(`http://localhost:8080/api/dashboard?instance=${params.instance}`);
  //console.log("data:"+JSON.stringify(data));


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
    const siteData = { 'Permissions Role': data.dataJson.permissions, 'InstanceId': data.dataJson.instanceId, "Locale": data.siteInfo.site.locale };

    const installedWixApps = convertArrayToObject(data.siteInfo.site.installedWixApps, "App");

    const billing = data.siteInfo.instance.isFree ? { "Plan": "Free" } : data.siteInfo.instance.billing
    const siteOrders = data.siteOrders

    return (

      <div className={classes.root}>
        <Typography variant="h3" component="h2">
          <strong>{data.siteInfo.site.siteDisplayName}</strong> Orders information
        </Typography>
        <p>
          Total amount of orders: <strong>{siteOrders.orders.length}</strong>
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data.siteOrders.orders.map(order => <ItemCard {...order} />)}
        </div>
      </div>
    );
  }
};


function ItemCard({ buyerInfo, lineItems, numericId, totals, currency, dateCreated, paymentStatus, shippingInfo }) {
  const classes = useItemStyles();
  const getStreet = () => {
    if (!shippingInfo.shipmentDetails.address.street) {
      return <span style={{ color: 'red' }}>Missing street address!</span>
    }
    return shippingInfo.shipmentDetails.address.street.name + shippingInfo.shipmentDetails.address.street.number
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Ordered at: {dateCreated}
        </Typography>
        <Typography variant="h5" component="h2">
          Order ID: {numericId}
        </Typography>
        <Typography className={classes.pos} >
          {lineItems.length} {lineItems.length > 1 ? "items" : "item"} purchased, for a total of <strong>{totals.total} {currency}</strong>
        </Typography>
        <Typography variant="body2" >
          Payment status: <strong>{paymentStatus}</strong>
        </Typography>
        <Typography variant="body2" >
          Purchased by: {buyerInfo.firstName} {buyerInfo.lastName} / {buyerInfo.phone} / {buyerInfo.email}
        </Typography>
        <Typography variant="body2" >
          Deliver to: <strong>{shippingInfo.shipmentDetails.address.country}, {shippingInfo.shipmentDetails.address.city}, {getStreet()}</strong>
        </Typography>
        <Divider style={{ marginTop: "20px", marginBottom: "10px" }} />
        <Typography variant="body2" >
          Items details:
         {lineItems.map(item => {
          return <Typography className={classes.title} color="textSecondary" gutterBottom>
            {item.name}/{item.sku}
          </Typography>
        })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Mark as shipped</Button>
      </CardActions>
    </Card >
  );
}
export default Dashboard;