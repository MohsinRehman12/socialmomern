const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute= require("./routes/users")
const authRoute= require("./routes/auth")
const postRoute= require("./routes/posts")
var cors = require('cors')



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

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/users" , userRoute)
app.use("/api/auth" , authRoute)
app.use("/api/posts" , postRoute)





app.get("/", (req,res)=> {
    res.send("welcome to home")
})

app.get("/users", (req,res)=> {
    res.send("welcome to users page")
})
app.listen(5050, ()=>{
    console.log("Server is running")
})