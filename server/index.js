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

const router = express.Router();
const multer = require("multer")
var cors = require('cors')
const path = require('path')



dotenv.config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("connected to server"))
.catch((err) => console.log(err));

const app = express();

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







app.get("/", (req,res)=> {
    res.send("welcome to home")
})

app.get("/users", (req,res)=> {
    res.send("welcome to users page")
})
app.listen(5050, ()=>{
    console.log("Server is running")
})