import joi from 'joi';

const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    type: joi.alternatives().allow("groceries", "restaurant", "transport", "education", "health").required()
})

export default createCardSchema