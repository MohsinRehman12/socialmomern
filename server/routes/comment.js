const Comment = require("../models/Comment");
const router = require("express").Router();

//add a message


router.post("/", async (req,res) =>{

    const newComment = new Comment (req.body)

    try {

        const savedComment = await newComment.save();
        res.status(200).json(savedComment)

        
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;


//get all Comment for a post

router.get("/:postId", async (req,res)=>{

    try {
        
        const comments = await Comment.find({
            postId:req.params.postId,
        })
        res.status(200).json(comments)

    } catch (error) {
        res.status(500).json(error)
    }


})