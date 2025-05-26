import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategories } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/Products/listProducts';
import { createProducts } from './app/useCases/Products/createProducts';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategories';
import { listOrders } from './app/useCases/Orders/listOrders';
import { createOrders } from './app/useCases/Orders/createOrders';
import { changeOrdersStatus } from './app/useCases/Orders/changeOrderStatus';
import { cancelOrders } from './app/useCases/Orders/cancelOrders';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

// List Categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategories);

// list Product
router.get('/products', listProducts);

// Create Product
router.post('/products', upload.single('image'), createProducts);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// list orders
router.get('/orders', listOrders);

// create orders
router.post('/orders', createOrders);

// change order status
router.patch('/orders/:orderId', changeOrdersStatus);

// delete/cancel orders
router.delete('/orders/:orderId', cancelOrders);