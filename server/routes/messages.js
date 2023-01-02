const Message = require("../models/Message");
const router = require("express").Router();

//add a message


router.post("/", async (req,res) =>{

    const newMessage = new Message (req.body)

    try {

        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)

        
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;


//get all message

router.get("/:convoId", async (req,res)=>{

    try {
        
        const messages = await Message.find({
            convoId:req.params.convoId,
        })
        res.status(200).json(messages)

    } catch (error) {
        res.status(500).json(error)
    }


})