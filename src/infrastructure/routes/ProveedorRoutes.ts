import { Router } from 'express';
import { ProveedorAdapter } from '../adapter/ProveedorAdapter';
import { ProveedorService } from '../../application/services/ProveedorService';
import { ProveedorController } from '../controller/ProveedorController';
import { authenticateToken } from '../web/authMiddleware';

const adapter = new ProveedorAdapter();
const service = new ProveedorService(adapter);
const controller = new ProveedorController(service);

const router = Router();

router.post   ('/', authenticateToken, async (req, res) => { await controller.create(req, res)});
router.get    ('/',                  async (req, res) => { await controller.list(req, res)});
router.get    ('/:id',               async (req, res) => { await controller.getById(req, res)});
router.put    ('/:id', authenticateToken, async (req, res) => { await controller.update(req, res)});
router.delete ('/:id', authenticateToken, async (req, res) => { await controller.delete(req, res)});

export default router;
