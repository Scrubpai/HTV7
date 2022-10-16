import React, { useContext } from 'react'
import Button from '@mui/material/Button';

import { SocketContext } from '../SocketContext'

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p style={{paddingRight:"3%", fontSize: '24px', lineHeight: '2.5rem',
    textAlign: 'center'}}>{call.name} is calling:</p>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  )
}

export default Notifications