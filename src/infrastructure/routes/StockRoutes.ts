import { Router } from 'express';
import { StockAdapter } from '../adapter/StockAdapter';
import { StockService } from '../../application/services/StockService';
import { StockController } from '../controller/StockController';
import { authenticateToken } from '../web/authMiddleware';

const router = Router();

const stockAdapter = new StockAdapter();
const stockService = new StockService(stockAdapter);
const stockController = new StockController(stockService);

router.post   ('/',                       async (req, res) => { await stockController.createStock(req, res); });
router.get    ('/:productoId',            async (req, res) => { await stockController.getStockByProduct(req, res); });
router.delete ('/:id', authenticateToken, async (req, res) => { await stockController.deleteStock(req, res); });

export default router;
