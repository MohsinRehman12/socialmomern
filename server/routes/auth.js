const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")

//Registration
router.post("/register", async (req,res) => {
    

    try {

        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        

        //create user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(err)
    }
})


//Login
router.post("/login", async (req,res)=> {
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).send("user not found")

        const validPass = await bcrypt.compare(req.body.password, user.password) //compares the password in body to pasword in users
        !validPass && res.status(400).json("wrong password for this user") 
        
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(err)

    }
    
});
module.exports = router