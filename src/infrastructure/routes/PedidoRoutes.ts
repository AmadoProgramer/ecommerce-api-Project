import { Router } from 'express';
import { PedidoAdapter } from '../adapter/PedidoAdapter';
import { PedidoService } from '../../application/PedidoService';
import { PedidoController } from '../controller/PedidoController';
import { authenticateToken } from '../web/authMiddleware';

const router = Router();
const pedidoAdapter = new PedidoAdapter();
const pedidoService = new PedidoService(pedidoAdapter);
const pedidoController = new PedidoController(pedidoService);

router.post   ('/', authenticateToken,    async(req, res) => {await pedidoController.createPedido(req, res)});
router.get    ('/',                       async(req, res) => {await pedidoController.getAllPedidos(req, res)});
router.get    ('/:id',                    async(req, res) => {await pedidoController.getPedidoById(req, res)});
router.put    ('/:id', authenticateToken, async(req, res) => {await pedidoController.updatePedido(req, res)});
router.delete ('/:id', authenticateToken, async(req, res) => {await pedidoController.deletePedido(req, res)});
// Ruta especial para cancelar
router.patch ('/:id/cancelar', authenticateToken, async(req, res) => {pedidoController.cancelPedido(req, res)});

export default router;