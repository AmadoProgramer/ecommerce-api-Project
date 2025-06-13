import { Router } from 'express';
import { PagoAdapter } from '../adapter/PagoAdapter';
import { PagoService } from '../../application/PagoService';
import { PagoController } from '../controller/PagoController';
import { authenticateToken } from '../web/authMiddleware';

const router = Router();
const pagoAdapter = new PagoAdapter();
const pagoService = new PagoService(pagoAdapter);
const pagoController = new PagoController(pagoService);

router.post   ('/', authenticateToken, async (req, res) => {await pagoController.createPago(req, res)});
router.get    ('/', authenticateToken, async (req, res) => {await pagoController.getAllPagos(req, res)});
router.get    ('/:id', authenticateToken, async (req, res) => {await pagoController.getPagoById(req, res)});
router.put    ('/:id', authenticateToken, async (req, res) => {await pagoController.updatePago(req, res)});
router.delete ('/:id', authenticateToken, async (req, res) => {await pagoController.deletePago(req, res)});

export default router;