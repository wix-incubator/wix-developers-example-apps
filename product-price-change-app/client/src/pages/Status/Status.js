import React, { useState, useEffect } from 'react'
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
import sadAnimationData from '../../util/4053-crying-smoothymon.json'
import loadingAnimationData from '../../util/654-circular-loading.json'

import goodAnimationData from '../../util/4054-smoothymon-clap.json'
import queryString from 'query-string'
import axios from 'axios';

const {
    MAIL_CHIMP_REDIRECT_URL,
    MAIL_CHIMP_CLIENT_ID
} = process.env;


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

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: goodAnimationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const defaultOptionsSad = {
    loop: true,
    autoplay: true, 
    animationData: sadAnimationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const defaultOptionsLoading= {
    loop: true,
    autoplay: true, 
    animationData: loadingAnimationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};


const Status = (props) => {
        const [isLoading, setIsLoading] = useState(true);
        const [data, setData] = useState({});
        const values = queryString.parse(props.location.search)
        const redirectUrl = encodeURIComponent(`${MAIL_CHIMP_REDIRECT_URL}?instanceId=${values.instance}`);
        let redirect = `https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=${MAIL_CHIMP_CLIENT_ID}&redirect_uri=${redirectUrl}`
        

        useEffect(() => {
            axios.get(
                `http://localhost:8080/api/status?instance=${values.instance}`,
              ).then(result => {
                  setData(result.data)
                }).catch(console.error).finally(() => setIsLoading(false));
        }, []);


        const classes = useStyles();
        
        
        
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Wix MailChimp App
                    </Typography>
                    {isLoading && <div><Lottie options={defaultOptionsLoading} height={100} width={100}/></div>}
                    {!isLoading && <>
                    <div className={classes.avatarRow}>
                        <Avatar className={classes.avatar} src="/static/images/wix-logo-96.png" />
                        
                        <Avatar className={classes.avatar} src="/static/images/mc-freddie-dark.svg" />
                    </div>  
                    <Typography component="h1" variant="h6">
                         {data.status === "connected" ? "App status: We are all good" : "App status: Something went wrong" }
                    </Typography>
                    {
                        data.status === "connected" ? <Lottie options={defaultOptions} height={180} width={180}/> : 
                        <div>
                            <Lottie options={defaultOptionsSad} height={100} width={100}/>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                target="_blank"
                                className={classes.submit}
                                href={redirect}
                                >
                                Install Now
                            </Button>
                            </div>
                            
                        }
                   </>
                }
                    
                    
                    
                </div>
                <Box mt={4}>
                    <Copyright />
                </Box>
            </Container>
        )
    }
    export default Status;