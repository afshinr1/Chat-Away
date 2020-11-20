import { Box } from '@material-ui/core'
import React from 'react'
import {MeetButton, useStyles} from './MeetStyles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { history } from '../Utilities/History';

/* UNFINISHED */
/* THIRD COLUMN IN MAIN PAGE. PROFILE BUTTON AND MEET SOMEONE NEW */
function Meet() {
    const classes = useStyles();

    return (
        <Box className={classes.meet_container} component='div' textAlign='center' flexDirection='column'>
            
            <input type="image" className={classes.btn_logo} onClick={e=> history.push('/profile')} alt='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`} />
            
             {/* DO SOMETHING ONCLICK*/}
            <MeetButton> Meet Someone New!
            <ChatBubbleIcon className={classes.speechIcon} />
            </MeetButton>
        </Box>
    )
}

export default Meet
