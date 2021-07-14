const createError = require('http-errors')
const userModel = require('../models/user')
const  { userValidationSchema } = require('../configurations/validation');


module.exports = {
    test:async(req,res,next) => {
        try {
            res.send("working User Routers")
        } catch (error) {
            createError.NotAcceptable("request can not be proceed")
        }
    },

    signup:async (req, res) => {
      let newUser = new userModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile_number: req.body.mobile_number,
        email: req.body.email,
        password: req.body.password,
      });

      var password = req.body.password;
      var confirm_password = req.body.confirm_password;
    
      // const result =  joi.validate(newUser ,userAuthSchema );
     const result = await  userValidationSchema.validateAsync(newUser)
      const { value, error } = result; 
      const valid = error == null; 
      if (!valid) { 
        res.status(422).json({ 
          message: 'Invalid request', 
          data: req.body 
        }) 
      }
    
      if (confirm_password !== password) {
        res.status(400).json({
          success: false,
          msg: "Password not match",
        });
      } else {
        try {
          const user = await userModel.addUser(newUser, (err, user) => {
            if (err) {
              res.status(400).json({
                success: false,
                msg: "Failed to procced",
                err: err.message,
              });
            } else {
              res.status(201).json({
                success: true,
                msg: "User Registered",
              });
            }
          });
        } catch (error) {
          if(error.isJoi === true){
            error.status= 422
            res.send({'Error' : error})
          }
    
          res.status(500).json({
            success: false,
            error: error.msg,
            msg: "Server Error",
          });
        }
      }
    
}
}