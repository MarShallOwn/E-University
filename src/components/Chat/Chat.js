import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import UserContact from './UserContact'
import ChatRoom from './ChatRoom'
import io from 'socket.io-client'

const Chat = props => {

    const [room, setRoom] = useState(null)

    const [socket, setSocket] = useState()
    

    useEffect(() => {
        const socketFetch = io('http://localhost:8080')

        setSocket(socketFetch)

        return () => {
            socketFetch.close()
        }
    }, [])

    return(
        <Grid container>
            <Grid item xs={3}>
                <Link to="/profile">Profile</Link>
                <UserContact socket={socket} setRoom={setRoom} room={room} />
            </Grid>
            <Grid item xs={9}>
                {room && <ChatRoom socket={socket} room={room} />}
            </Grid>
        </Grid>
    )
}

export default Chat;