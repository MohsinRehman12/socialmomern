const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute= require("./routes/users")
const authRoute= require("./routes/auth")
const postRoute= require("./routes/posts")
const convoRoute= require("./routes/convo")
const messageRoute= require("./routes/messages")
const commentRoute= require("./routes/comment")
const http = require('http')
const router = express.Router();
const multer = require("multer")
var cors = require('cors')
const path = require('path')
const { Server } = require("socket.io")

const PORT = process.env.PORT || 5050;

dotenv.config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("connected to server"))
.catch((err) => console.log(err));

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    }
})

//middleware
app.use(cors())
app.use("/images", express.static(path.join(__dirname,"public/images")))
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename: (req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload = multer({storage});



app.post("/api/upload", upload.single("file"), (req,res)=>{

    try {
        return res.status(200).json("File uploaded successfully.")
    } catch (error) {
        console.log(error)
    }

})

app.use("/api/users" , userRoute)
app.use("/api/auth" , authRoute)
app.use("/api/posts" , postRoute)
app.use("/api/convo" , convoRoute)
app.use("/api/message" , messageRoute)
app.use("/api/comment" , commentRoute)




app.use(express.static(path.join(__dirname, "/<front end app folder name>/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


app.get("/", (req,res)=> {
    res.send("welcome to home")
})

app.get("/users", (req,res)=> {
    res.send("welcome to users page")
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

app.listen(PORT, ()=>{
    console.log("Server is running")
})