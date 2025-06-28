// ProductoRoutes.ts (temporal)
import { Router } from 'express';
import { ProductoAdapter } from '../adapter/ProductoAdapter';
import { ProductoService } from '../../application/services/ProductoService';
import { ProductoController } from '../controller/ProductoController';
import { authenticateToken } from '../web/authMiddleware';

const router = Router();
const productoAdapter = new ProductoAdapter();
const productoService = new ProductoService(productoAdapter);
const productoController = new ProductoController(productoService);

router.post   ('/', authenticateToken,    async (req, res) => {await productoController.createProducto(req, res)});
router.get    ('/',                       async (req, res) => {await productoController.getAllProductos(req, res)});
router.get    ('/:id',                    async (req, res) => {await productoController.getProductoById(req, res)});
router.put    ('/:id', authenticateToken, async (req, res) => {await productoController.updateProducto(req, res)});
router.delete ('/:id', authenticateToken, async (req, res) => {await productoController.deleteProducto(req, res)});

export default router;
