import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const MainCard = ({className,appVersion, siteName }) => {

  const classes = useStyles();

  return (
    <Card
      
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
              color="inherit"
              gutterBottom
              variant="body2"
            >
              App Version:
            </Typography>
            
            <Typography
              color="inherit"
              variant="h4"
            >
              {appVersion}
            </Typography>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="h6"
            >
             Site Name: {siteName}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EmailIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

MainCard.propTypes = {
  className: PropTypes.string
};

export default MainCard;