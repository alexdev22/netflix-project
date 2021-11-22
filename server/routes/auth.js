const router = require("express").Router()
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post("/register",  async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTO_JS_PASSWORD).toString()
    })
try {
   const user =  await newUser.save()

    res.status(201).json(user) 
} catch (error) {
    res.status(500).json(error)
}
    
})

router.post("/login", async (req,res) => {
    try {
       const user =  await User.findOne({email:req.body.email})

        !user && res.status(401).json("Wrong Password or username")

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_JS_PASSWORD);
        const originalPasword = bytes.toString(CryptoJS.enc.Utf8);

        originalPasword !== req.body.password && res.status(401).json("Wrong Password or username") 
        const accesToken = jwt.sign({id: user.id, isAdmin: user.isAdmin},process.env.CRYPTO_JS_PASSWORD, {expiresIn: "5d"})
        const {password, ...info} = user._doc

        res.status(200).json({...info, accesToken})

    } catch (error) {

        res.send(400).json(error)

    }

        

  


})

module.exports = router