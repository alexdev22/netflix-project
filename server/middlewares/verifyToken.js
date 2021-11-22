const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
    const authHeader = req.headers.token

    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.CRYPTO_JS_PASSWORD, (err, credentials) => {
            if(err) res.status(403).json('Token is not valid')

            req.user = credentials
           
        })
           next()
    } else {
return res.status(401).json("You Are not Authenticated")
    }

     
}

module.exports = verify