const { string } = require('joi');
const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require('bcryptjs')


const userSchema = mongoose.Schema({

    first_name: {
        type: String,
        trim: true,
        lowercase:true
    },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase:true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error('Email is not valid');
        //     }
        // }
    },
    password: {
        type: String,
        // required:true        
    },
    mobile_number: {
        type: String,
    },
    created_at: {
        type: String,
        default: new Date()
    },
    updated_at: {
        type: String,
        default: new Date()
    }

})

//for hashing the pssword
userSchema.pre('save', function (next) {
    let user = this;
    let costFactor = 10;

    if (user.isModified('password')) {
        // if the password field has been edited/changed then run this code.

        // Generate salt and hash password
        bycrypt.genSalt(costFactor, (err, salt) => {
            bycrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

const user = mongoose.model('user', userSchema)
module.exports = user