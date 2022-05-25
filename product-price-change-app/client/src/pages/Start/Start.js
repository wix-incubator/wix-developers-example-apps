import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import Lottie from 'react-lottie'
import animationData from '../../util/1175-email.json'
import queryString from 'query-string'


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Wix MailChimp App
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: 96,
        height: 96
    },
    avatarSmall: {
        margin: theme.spacing(1),
        width: 35,
        height: 35,
        backgroundColor: grey[500]
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    avatarRow:{
        display: 'flex',
        '& > *': {
        margin: theme.spacing(2),
        },
    }
}));

const Start = (props) => {
        const classes = useStyles();
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        const values = queryString.parse(props.location.search)
        let redirect = "http://localhost:8080/api/app-wix?token="+values.token
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Wix MailChimp App
                    </Typography>

                    <div className={classes.avatarRow}>
                        <Avatar className={classes.avatar} src="/static/images/wix-logo-96.png" />
                        <Lottie options={defaultOptions}
                            height={100}
                            width={100}
                        />
                        <Avatar className={classes.avatar} src="/static/images/mc-freddie-dark.svg" />
                    </div>

                    <Typography component="h1" variant="h6">
                        Synchronized Wix contacts to MailChimp
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                        by clicking install you argee to our <Link>terms</Link> and <Link>privacy policy</Link>
                    </Typography>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    href={redirect}
                    >
                    Install Now
                    </Button>
                </div>
                <Box mt={4}>
                    <Copyright />
                </Box>
            </Container>
        )
}
export default Start;
