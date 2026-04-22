import Joi from "joi";

export const createOrderSchema = Joi.object({
  user_id: Joi.string().required(),

  items: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),

  note: Joi.string().optional().allow(""),
});