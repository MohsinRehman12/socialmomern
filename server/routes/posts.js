const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")

//post creation
router.post("/", async (req,res)=>{

    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})


//update post

router.put("/:id", async (req,res)=>{
    const post = await Post.findById(req.params.id);

    try {
        if(post.userId === req.body.userId){

            await post.updateOne({$set:req.body})
            res.status(200).json("The post has been updated")

        }else{
            res.status(403).json("You can only update your own posts")
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
    
})

//delete posts

router.delete("/:id", async (req,res)=>{
    const post = await Post.findById(req.params.id);

    try {
        if(post.userId === req.body.userId){

            await post.deleteOne({$set:req.body})
            res.status(200).json("The post has been deleted")

        }else{
            res.status(403).json("You can only delete your own posts")
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
    
})

//like posts

router.put("/:id/like", async (req,res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("post has been liked")
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("post has been disliked")

        }

    } catch (error) {
        res.status(500).json(error);
    }
})

//get a posts

router.get("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
        
    } catch (error) {
        res.status(500).json(error);
    }
})


//get all posts of users followings

router.get("/timeline/:userId", async(req,res)=>{ //we have to add /all because the previous get request will just take timeline as an id and give an error

    let postArray = [];
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId:currentUser._id});
        const followingPosts = await Promise.all( //maps all values in users following to get posts
            currentUser.followings.map(followingId => {
                return Post.find({userId: followingId})
            })
        )
        res.json(userPosts.concat(...followingPosts))
        
    } catch (error) {
        res.status(500).json(error);
    }
})

//get the post from a user
router.get("/profile/:username", async(req,res)=>{ //we have to add /all because the previous get request will just take timeline as an id and give an error

    try {
        
        const user = await User.findOne({username:req.params.username})
        const posts = await Post.find({userId:user._id})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;