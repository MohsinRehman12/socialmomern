const router = require("express").Router();
const Convo = require("../models/Convo");


//new convo

router.post("/", async (req,res)=>{
    const newConvo = new Convo({
        members:[req.body.senderId, req.body.recieverId],
    });

    try {
        const savedConvo = await newConvo.save();
        res.status(200).json(savedConvo)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get convo

router.get("/:userId", async (req,res)=>{
    
    try {
        
        const convo = await Convo.find({
            members: { $in:[req.params.userId] },
        }) 
        res.status(200).json(convo)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get convo for clicking on online users

router.get("/find/:firstUserId/:secondUserId", async (req,res)=> {

    try {

        const convo = await Convo.findOne({
            members: { $all:[req.params.firstUserId, req.params.secondUserId] },

        })

        res.status(200).json(convo)

        
    } catch (error) {
        res.status(500).json(error)
    }

})



module.exports = router;