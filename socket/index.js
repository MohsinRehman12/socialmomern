
const http = require('http').Server(app);
const io = require('socket.io')(http);


let users = [];

//make sure users in users array are unique
const addUser = (userId, socketId) =>{
    !users.some(user=>user.userId===userId) &&
    users.push({ userId, socketId });
}

const removeUsers = (socketId) =>{
    users = users.filter(user=>user.socketId !== socketId);
}


const getUser = (userId) =>{

    return users.find(user=>user.userId === userId)
}


const getUserName = (username) =>{

    return users.find(user=>user.username === username)
}

io.on("connection", (socket) => {
    console.log("a user has connected");
    socket.on("addUser", userId=>{
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    });
    
    

    //messaging

    socket.on("sendMessage", ({senderId,recieverId,text})=>{
        const receiver = getUser(recieverId);

        io.to(receiver.socketId).emit("getMessage",{
            senderId, 
            text,
        })
    })

    //notifications

    socket.on("sendNotification", ({ senderName, senderId, recieverId, type, pfp }) => {
        const receiver = getUser(recieverId);

        if(!(senderId===recieverId)){

            io.to(receiver?.socketId).emit("getNotification", {
                senderName,
                type,
                pfp
            });

        }
        
      });

      socket.on("sendNotificationMessenger", ({ senderName, senderId, recieverId, type, pfp }) => {
        const receiver = getUser(recieverId);

        if(!(senderId===recieverId)){

            io.to(receiver?.socketId).emit("getNotificationMessenger", {
                senderName,
                type,
                pfp
            });

        }
        
      });

      socket.on("sendNotificationFollow", ({ senderName, senderId, recieverId, type, pfp }) => {
        const receiver = getUser(recieverId);

        if(!(senderId===recieverId)){

            io.to(receiver?.socketId).emit("getNotificationFollow", {
                senderName,
                type,
                pfp
            });

        }
        
      });


    socket.on("disconnect", ()=>{
        console.log("a user disconnected")
        removeUsers(socket.id)
        io.emit("getUsers", users)
    })


})