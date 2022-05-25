import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.dark
  },
  differenceValue: {
    color: theme.palette.dark,
    marginRight: theme.spacing(1)
  },
  button :{
    width: 230,
  }
}));

const TotalContacts = props => {
  const {number,link, image, by, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="primary"
              gutterBottom
              variant="body2"
            >
              Total Contacts at {by}
            </Typography>
            <Typography variant="h3" >{number}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar} src={image} />
          </Grid>
        </Grid>
        <div className={classes.difference}>
          
          
            <Button 
            variant="contained" 
            color="secondary"
            target="_blank"
            href={link}>{by} Dashboard
            </Button>
          
          
        </div>
      </CardContent>
    </Card>
  );
};

TotalContacts.propTypes = {
  className: PropTypes.string
};

export default TotalContacts;