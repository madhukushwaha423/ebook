const Joi = require('joi')

const userValidationSchema = Joi.object({
    role: Joi.string().lowercase().default("user"),
    first_name: Joi.string().lowercase().default("user"),
    last_name:Joi.string().trim(),
    email: Joi.string().lowercase(),
    password:Joi.string().min(8).max(16),
    mobile_number:Joi.string().length(10).length(10),
})

module.exports= {
    userValidationSchema:userValidationSchema
}


// .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))