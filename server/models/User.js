const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        require: true,
        min: 3,
        max: 20,
        unique:true,
    },
    email: {
        type:String,
        require: true,
        max: 60,
        unique:true,
    },
    password: {
        type:String,
        require: true,
        min: 6,    
    },
    profilePicture: {
        type:String,
        default:"",
    },

    coverPicture: {
        type:String,
        default:"",
    },

    followers: {
        type:Array,
        default:[],

    },

    followings: {
        type:Array,
        default:[],

    },

    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type: String,
        max:75,
    },
    city:{
        type: String,
        max: 75,
    },
    from:{
        type: String,
        max: 75,
    },
    relationship:{
        type: Number,
        enum: [1, 2, 3, 4],
    },

    firstName:{
        type: String,
        max: 30,
    },

    lastName:{
        type: String,
        max: 30,
    },

    birthday:{
        type: String,
    }
    
},
{timestamps:true}
)

module.exports = mongoose.model("User", UserSchema)