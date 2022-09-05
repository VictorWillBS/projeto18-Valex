import joi from 'joi';

const activeCardSchema = joi.object({
    cvc: joi.string().required(),
    password: joi.string().required()
})

export default activeCardSchema