import joi from 'joi';

const paymentSchema = joi.object({
    cardId: joi.number().required(),
    amount: joi.number().greater(0).required(),
    password:joi.string().required(),
    businessId:joi.number().required(),
    businessType: joi.alternatives().allow("groceries", "restaurant", "transport", "education", "health").required()
})

export default paymentSchema