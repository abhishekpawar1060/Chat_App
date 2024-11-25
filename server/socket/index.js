const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');

const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})

//Online user

const onlineUser = new Set()

io.on('connection', async(socket) => {
    console.log("Connect User", socket.id);
    const token = socket.handshake.auth.token

    //current user details
    const user = await getUserDetailsFromToken(token);

    // console.log("user", user);

    // create a room
    socket.join(user?._id)

    onlineUser.add(user?._id)
    
    io.emit('onlineUser', Array.from(onlineUser))

    //Disconnect User
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id);
        console.log("Disconnect User", socket.id);
        
    })
})



module.exports = { app, server };