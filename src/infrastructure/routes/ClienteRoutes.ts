// src/infrastructure/web/routes/cliente.routes.ts

import { Router } from "express";
import { ClienteAdapter } from "../../infrastructure/adapter/ClienteAdapter";
import { ClienteService } from "../../application/services/ClienteService";
import { ClienteController } from "../controller/ClienteController";
import { authenticateToken } from "../web/authMiddleware"; // Asegúrate de que esta ruta esté bien

const router = Router();

const clienteAdapter = new ClienteAdapter();
const clienteService = new ClienteService(clienteAdapter);
const clienteController = new ClienteController(clienteService);

router.post("/login", async (req, res) => {
  await clienteController.login(req, res);
});

router.post("/register", async (req, res) => {
  await clienteController.register(req, res);
});

router.get("/", async (req, res) => {
  await clienteController.getAllClientes(req, res);
});

router.get("/:id", async (req, res) => {
  await clienteController.getClienteById(req, res);
});

router.put("/:id", authenticateToken, async (req, res) => {
  await clienteController.updateCliente(req, res);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  await clienteController.deleteCliente(req, res);
});

export default router;
