const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt")

//update user

router.put("/:id", async (req,res)=>{ //allows us to use any uID
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password ){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
               return res.status(500).json(error)
            }
            
        }

        try {

            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            })
            res.status(200).json("account updated")
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }else{
        return res.status(403).json("you can only access your account for updates")
    }
});

//delete user

router.delete("/:id", async (req,res)=>{ //allows us to use any uID
    if(req.body.userId == req.params.id || req.body.isAdmin){

        try {

            const user = await User.findByIdAndDelete(req.params.id,{

            })
            res.status(200).json("account deleted")
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }else{
        return res.status(403).json("you can only access your account for delets")
    }
});

//get a user

router.get("/", async(req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;

    try {

        const user = userId ? await User.findById(userId) : await User.findOne({username:username})
        const {password,updatedAt, ...other} = user._doc //doc carries out all of the object
        res.status(200).json(other)
        
    } 
    
    catch (error) {
        res.status(500).json(error)
    }
})

//Get Friends

router.get("/friends/:userId", async (req, res) =>{
    try {
        
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map(followerId=>{
                return User.findById(followerId)
            })
        )

        let followerList = [];
        
        friends.map((friend)=>{
            const {_id, username, profilePicture} = friend
            followerList.push({_id, username, profilePicture})
        });

        res.status(200).json(followerList)

    } catch (error) {
        res.status(500).json(error)
    }
})

//follow a user

router.put("/:id/follow", async (req,res)=>{

    if(req.body.userId !== req.params.id){
        
        try {

            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){

                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json("user has been followed");


            }
            else{
                res.status(403).json("you already follow this individual")
            }


            
        } 
        
        catch (error) {
            res.status(500).json(error)

        }

    }
    else{
        res.status(403).json("you cant follow yourself")
    }

})

//unfollow a user

router.put("/:id/unfollow", async (req,res)=>{

    if(req.body.userId !== req.params.id){
        
        try {

            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){

                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json("user has been unfollowed");


            }
            else{
                res.status(403).json("you dont follow this person")
            }


            
        } 
        
        catch (error) {
            res.status(500).json(error)

        }

    }
    else{
        res.status(403).json("you cant unfollow yourself")
    }

})

module.exports = router