const { ConversationModel } = require('../models/Conversation')

const getConversation = async(currentUserId) => {
    if(currentUserId){
        const currentUserConverstion = await ConversationModel.find({
            "$or": [
                { sender: currentUserId },
                { receiver: currentUserId }
            ]
        }).sort({ updatedAt: -1 }).populate('messages').populate('sender').populate('receiver')

        // console.log(currentUserConverstion);
        
        const conversation = currentUserConverstion.map((conv) => {
            const countUnssenMsg = conv.messages.reduce((prev, curr) => {

                const msgByUserId = curr?.msgByUserId?.toString();

                if(msgByUserId !== currentUserId){
                    return prev + (curr.seen ? 0 : 1);
                }else{
                    return prev;
                }
            }, 0);

            return {
                _id: conv?._id,
                sender: conv?.sender,
                receiver: conv?.receiver,
                unseenMsg: countUnssenMsg,
                lastMsg: conv.messages[conv?.messages?.length-1]
            }
        })

        return conversation;
    }else{
        return [];
    }   

}

module.exports = getConversation