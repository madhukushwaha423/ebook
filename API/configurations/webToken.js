const crypto = require('crypto');
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken')

// const client = require('../redis/init_redis')

const jwtSecret = "2109594077mySecretKey8616314359";


module.exports = {

     signAccessToken:(userId) => { 
         return new Promise ( (resolve,reject) => { 
             const payload = {
             }
             const secret = jwtSecret
             const options= {
                 expiresIn:'20h',
                 issuer:"pickurpage.com",
                 audience:userId.toString()
             } 
             jwt.sign(payload, secret,options, (err,token) => {
                 if(err){
                     console.log(err);
                    reject (createHttpError.InternalServerError())
                 }
                 resolve(token)
             })
         })
     },

     verifyAccessToken:(req,res,next) => {
         if(!req.headers['authorization']) {
             return next(creteError.Unauthorized())
         }
         const authHeader = req.headers['authorization'] 
         const bearerToken = authHeader.split(' ')
         const token = bearerToken[1]
         jwt.verify(token , jwtSecret, (err, payload )=> { 
             if(err){
                const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message 
                return next(createHttpError.Unauthorized(message))
             }
             res.payload = payload 
             next()
         })
     },
     
     signRefreshToken:(userId) => { 
        return new Promise((resolve, reject) => {
            crypto.randomBytes(64, (err, buf) => {
                if (!err) {
                    // no error
                    let token = buf.toString('hex');
    
                    return resolve(token);
                }
            })
        })
    },

    verifyRefreshToken:(refreshToken) => { 
        return new Promise( (resolve, reject) => { 
            jwt.verify(refreshToken, jwtSecret, ( err, payload) => {
                if(err){
                    return reject(createHttpError.Unauthorized())
                } 
                const userId = payload.aud 
                resolve(userId)
            })
        })
    },

}
