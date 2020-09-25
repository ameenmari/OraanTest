

const Joi = require('@hapi/joi');
const signinValidation = (data) => {
    const schema = {
        number: Joi.string().min(10).max(15).required(),
        password: Joi.string().min(6).max(15).required()
    }
    return Joi.validate(data, schema);
}


const registerValidation = (data) => {
    const schema = {

        number: Joi.string().regex(/^[0-9]{10,15}$/).required(),
        name: Joi.string().min(3).max(15).required(),
        password: Joi.string().min(6).max(15).required()


    }
    return Joi.validate(data, schema);
}

const instalmentValidation = (data) => {
    const schema = {


        instalmentAmount: Joi.string().regex(/^[0-9]/).required(),
        paymentMethod: Joi.string().min(4).max(30).required(),
        userId: Joi.string().required()

    }
    return Joi.validate(data, schema);
}

module.exports.signinValidation = signinValidation;
module.exports.registerValidation = registerValidation;
module.exports.instalmentValidation = instalmentValidation;


