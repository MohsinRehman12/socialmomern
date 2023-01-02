const mongoose = require("mongoose");

const ConvoSchema = new mongoose.Schema({
   members: {
    type: Array,
   }
    
},
{timestamps:true}
)

module.exports = mongoose.model("Convo", ConvoSchema)