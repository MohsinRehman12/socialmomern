const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    }
})

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

io.on("connection", (socket) => {
    console.log("a user has connected");
    socket.on("addUser", userId=>{
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    });

    
    

    //messaging

    socket.on("sendMessage", ({senderId,recieverId,text})=>{
        const user = getUser(recieverId);

        io.to(user.socketId).emit("getMessage",{
            senderId, 
            text,
        })
    })

    socket.on("disconnect", ()=>{
        console.log("a user disconnected")
        removeUsers(socket.id)
        io.emit("getUsers", users)
    })
})