import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';






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

const ListData = ({title, data, icon }) => {

  const classes = useStyles();

  return (
        <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.title}>
                {title}
            </Typography>
            <div className={classes.demo}>
              <List>
                  {Object.entries(data).map(([key, value]) =>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                            {icon}
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                        primary={key}
                        secondary={value}
                        />
                  </ListItem>
                  )}
              </List>
            </div>
          </Grid>
          
  );
};

ListData.propTypes = {
  className: PropTypes.string
};

export default ListData;