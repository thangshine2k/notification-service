import { createOrder } from "../services/order.service.js";
import { createOrderSchema } from "../validators/order.validator.js";
import { addJob } from "../queue/notification.queue.js";

export const createOrderHandler = async (req, res, next) => {
  try {
    // validate
    const { error, value } = createOrderSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    // call service
    const order = createOrder(value);

    addJob({
      email: "thangthontien2k@gmail.com",
      message: "Your order created",
    });

    // for (let i = 0; i < 1000; i++) {
    //   addJob({
    //     email: "thangthontien2k@mail.com",
    //     message: `Order ${i}`,
    //   });
    // }
    return res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
