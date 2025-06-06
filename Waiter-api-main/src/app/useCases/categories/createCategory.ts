import { Request, Response } from 'express';
import { Category } from '../../models/Category';


export async function createCategories(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    if (!name) {
      res.status(400).json({
        error: 'Nome não cadastrado',

      });
    }

    const category = await Category.create({
      icon,
      name
    });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}