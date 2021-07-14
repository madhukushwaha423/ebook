const express = require('express');
const createHttpError = require('http-errors');
const router = new express.Router()
const  { test,signup } = require('../controller/userController')
const userModel = require('../models/user');
const { signAccessToken , signRefreshToken } = require('../configurations/webToken');


router.get('/userRouter', async(req,res) => {
    try {
        res.json({
            msg: "Working user Routers "
        })
    } catch (error) {
        res.json({
            "Error " : error
        })
    }
});

//for registering user bia emailo and password 
router.post('/user/register', async (req, res, next) => {
    try {

        const newUser = new userModel({
            email: req.body.email,
            password: req.body.password //"req.body.password",
        })
        console.log(newUser);

        const confirm_password = req.body.confirm_password

        if (!newUser.email || !newUser.password) {
            throw createHttpError.BadRequest()
        }

        if (newUser.password !== confirm_password) {
            throw createHttpError.Conflict("Password does not match")
        }

        const doesExist = await userModel.findOne({ email: newUser.email })
        if (doesExist) {
            throw createHttpError.Conflict(`${newUser.email} is already registerd`)
        }
        const savedUser = await newUser.save()
        if (!savedUser) {
            throw createHttpError.createError("can not Register user")
        }
        const _id = savedUser._id
            const accessToken = await signAccessToken(_id)
            const refreshToken = await signRefreshToken(_id)
            res.json({
                success: true,
                "id" : _id,
                "msg" : "successfully Registered", 
                "accessToken"  : accessToken ,
                "RefreshToken":refreshToken ,
                "Data" : savedUser
            })
    } catch (error) {
        next(error)
    }
})

//for loging in users
router.post('/user/login', async (req, res, next) => {
    try {
        const findbyCredentials = ({
            email: req.body.email,
            password: req.body.password
        })

        const doesExist = await userModel.findOne({ email: findbyCredentials.email })
        console.log(doesExist);
        if (!doesExist) {
            return res.status(401).json({
                success : false
            })
        }
        else {
            const _id = doesExist._id
            const accessToken = await signAccessToken(_id)
            const refreshToken = await signRefreshToken(_id)
            console.log(doesExist);
            res.status(200).json({
                "id":_id,
                "accessToken" : accessToken,
                "RefreshToken" : refreshToken
            })
        }
    } catch (error) {
        next(error)
        res.status(401).json({
            success:false,
            msg : error
        })
    }
})

//get user by id 
router.get('/user/:id' , async(req, res) => {
    try {
        const id = req.params.id 
        const user = await userModel.findById({_id:id})
        if(user == null){
            res.status(404).json({
                msg : "Can not find any user" ,
                success : false
            })
        }
    else{
        res.status(200).json({
            "Email" : user.email,
            msg : "User founded "
        })
    }
    } catch (error) {
        res.status(404).json({
            success: false,
            msg : error
        })
    }
})
module.exports = router