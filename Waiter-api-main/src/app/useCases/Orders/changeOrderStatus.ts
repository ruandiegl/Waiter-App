import { Request, Response } from 'express';
import { Order } from '../../models/Order';


export const changeOrdersStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;


    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      res.status(400).json({
        error: 'Invalid status'
      });
      return;

    }
    await Order.findByIdAndUpdate(orderId, { status });
    res.sendStatus(204);
    return;
  } catch  {
    res.sendStatus(500);
  }
};