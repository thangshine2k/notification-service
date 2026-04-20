import { orders } from "../db/mock.db.js";
import { v4 as uuidv4 } from "uuid";

export const createOrder = (data) => {
  const newOrder = {
    id: uuidv4(),
    user_id: data.user_id,
    items: data.items,
    note: data.note || "",
    created_at: new Date(),
  };

  orders.push(newOrder);

  return newOrder;
};
