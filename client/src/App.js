import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import VideoPlayer from './components/VideoPlayer';
import Notifications from './components/Notifications';
import Options from './components/Options';
import Transcribe from './components/Transcribe';
import Quote from './components/quote';
import logo from './components/imgs/logo.png';
import './styles.css';

import { useContext } from 'react';
import { SocketContext } from './SocketContext';
import { autocompleteClasses } from '@mui/material';

const useStyles = makeStyles()((theme) => {
  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '90%',
      marginLeft: '5%'
    },
    //quote: {
      //border: '1px solid black',
      //borderRadius: '4px',
      //width: '80%',
      //padding: '2%',
      //margin: '2% auto',
    //},
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    video: {
      display: 'flex',
      flexDirection: 'column',
    }
  };
});

const App = () => {
  const { classes } = useStyles();
  const { callAccepted, callEnded } = useContext(SocketContext);
  //const { hide } = useContext(SocketContext);
  
    return (
      <div className={classes.wrapper}>
        <div style={{margin: "2%"}} color="inherit">
          <img src={logo} className="logo"></img>
        </div>
        <div>
          <div className={classes.container}>
            <div style={{width: '600px', margin: '0 2px'}}>
            {
            callAccepted && !callEnded?
              <div>
                <Transcribe />
              </div>
            : <div></div>
            }
              <Options>
                <Notifications />
              </Options>
            </div>
            <div className={classes.video}>
              <VideoPlayer />
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default App;