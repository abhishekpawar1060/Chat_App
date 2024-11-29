const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');

const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const UserModel = require('../models/UserModel');
const { ConversationModel, MessageModel } = require('../models/Conversation')

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
    socket.join(user?._id.toString());

    onlineUser.add(user?._id?.toString());
    
    io.emit('onlineUser', Array.from(onlineUser));

    socket.on('message-page', async(userId) => {
        console.log("userId", userId);

        const userDetails = await UserModel.findById(userId).select("-password");
        
        const payload = {
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profile_pic: userDetails?.profile_pic,
            online: onlineUser.has(userId)
        }

        socket.emit('message-user', payload);

    })


    //new message
    socket.on('new message', async(data) => {

        let conversation = await ConversationModel.findOne({
            "$or": [
                {
                    sender: data?.sender,
                    receiver: data?.receiver
                },
                {
                    sender: data?.receiver,
                    receiver: data?.sender
                }
            ]
        })

        if(!conversation){
            const createConversation = await ConversationModel({
                sender: data?.sender,
                receiver: data?.receiver
            })
            conversation = await createConversation.save();
        }

        const message = new MessageModel({
            text: data.text,
            image: data.imageUrl,
            video: data.videoUrl,
            msgByUserId: data?.msgByUserId
        })
        
        const saveMessage = await message.save();
        
        const updateConversation = await ConversationModel.updateOne({_id: conversation?._id},{
            "$push": {
                messages: saveMessage?._id
            }
        })

        const getConversationMessage = await ConversationModel.findOne({
            "$or": [
                {
                    sender: data?.sender,
                    receiver: data?.receiver
                },
                {
                    sender: data?.receiver,
                    receiver: data?.sender
                }
            ]
        }).populate('messages').sort({ updatedAt: -1})

        io.to(data?.sender).emit('message', getConversationMessage.messages)     
        io.to(data?.receiver).emit('message', getConversationMessage.messages)     
    })

    //Disconnect User
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id);
        console.log("Disconnect User", socket.id);
        
    })
})



module.exports = { app, server };