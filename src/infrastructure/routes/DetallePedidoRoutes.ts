import { Router } from 'express';
import { DetallePedidoAdapter } from '../adapter/DetallePedidoAdapter';
import { DetallePedidoService } from '../../application/DetallePedidoService';
import { DetallePedidoController } from '../controller/DetallePedidoController';
import { authenticateToken } from '../web/authMiddleware';

const router = Router();
const detalleAdapter = new DetallePedidoAdapter();
const detalleService = new DetallePedidoService(detalleAdapter);
const detalleController = new DetallePedidoController(detalleService);

router.post   ('/', authenticateToken, async(req, res) => {await detalleController.createDetallePedido(req, res)});
router.get    ('/',                    async(req, res) => {await detalleController.getAllDetallePedidos(req, res)});
router.get    ('/:id',                 async(req, res) => {await detalleController.getDetallePedidoById(req, res)});
router.put    ('/:id', authenticateToken, async(req, res) => {await detalleController.updateDetallePedido(req, res)});
router.delete ('/:id', authenticateToken, async(req, res) => {await detalleController.deleteDetallePedido(req, res)});

export default router;

