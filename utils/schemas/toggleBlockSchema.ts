import joi from 'joi';

const toogleBlockSchema = joi.object({
    id: joi.number().required(),
    password: joi.string().max(4).required()
})

export default toogleBlockSchema