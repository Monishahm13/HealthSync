const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/signup", async(req,res)=>{

try{

const {name,email,password,role} = req.body;

const existingUser = await User.findOne({email});

if(existingUser){
    return res.status(400).json({
        message:"Email already exists"
    });
}

const hashedPassword = await bcrypt.hash(password,10);

const user = await User.create({
    name,
    email,
    password:hashedPassword,
    role
});

res.status(201).json({
    success:true,
    message:"User registered successfully"
});

}
catch(error){

res.status(500).json({
    success:false,
    error:error.message
});

}

});

router.post("/login", async(req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
    return res.status(404).json({
        message:"User not found"
    });
}

const isMatch = await bcrypt.compare(
    password,
    user.password
);

if(!isMatch){

return res.status(400).json({
    message:"Invalid credentials"
});

}

const token = jwt.sign(
{
    id:user._id,
    role:user.role
},
process.env.JWT_SECRET,
{
    expiresIn:"7d"
}
);

res.json({
    success:true,
    token,
    role:user.role,
    profileCompleted:user.profileCompleted
});

}
catch(error){

res.status(500).json({
    error:error.message
});

}

});

module.exports = router;