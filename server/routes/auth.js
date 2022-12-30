const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")

//Registration
router.post("/register", async (req,res) => {
    

    try {

        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt)

        const checkForEmail = await User.findOne({ email: req.body.email });

        if(checkForEmail){
          return res.status(409).json("Email in use");

        } else{

        //create user
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
        });

        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user);

      }
        

        
    } catch (error) {
        res.status(500).json(error)
    }
})


//Login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user){
        return res.status(404).json("user not found");
      }
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validPassword){
        return res.status(404).json("wrong password")
      }
  
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
});
module.exports = router