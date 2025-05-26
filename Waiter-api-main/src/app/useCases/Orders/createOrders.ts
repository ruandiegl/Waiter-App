import { Request, Response } from 'express';

import { Order } from '../../models/Order';
import { io } from '../../..';


export async function createOrders(req: Request, res: Response) {
  try {
    const { table, products } = req.body;

    const order = await Order.create({  table, products });
    const orderDetails = await order.populate('products.product')

    io.emit('orders@new', order)

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
