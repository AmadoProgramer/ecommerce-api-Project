import { ClienteService } from "../../application/services/ClienteService";
import { Request, Response } from "express";
import Joi from "joi";
import {
  ClienteCreateDto,
  ClienteUpdateDto,
  ClienteResponseDto,
} from "../../application/dtos/cliente";

export class ClienteController {
  private app: ClienteService;

  constructor(app: ClienteService) {
    this.app = app;
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, contrasena } = req.body;
      if (!email || !contrasena) {
        return res.status(400).json({ error: "Email y contraseña son requeridos" });
      }

      const token = await this.app.login(email.trim(), contrasena.trim());
      return res.status(200).json({ token });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg === "Credenciales incorrectas") {
        return res.status(401).json({ error: msg });
      }
      return res.status(500).json({ error: "Error en el servidor", details: msg });
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const schema = Joi.object({
        nombre: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        contrasena: Joi.string().min(8).required(),
        telefono: Joi.string().pattern(/^[0-9]{7,15}$/).required(),
        cedula: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        direccion: Joi.string().min(5).required(),
      });

      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const cliente = await this.app.register(value as ClienteCreateDto);
      const response: ClienteResponseDto = {
        id: cliente.id,
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono,
        cedula: cliente.cedula,
        direccion: cliente.direccion,
        estado: cliente.estado,
      };

      return res.status(201).json({ message: "Cliente registrado", cliente: response });
    } catch (err) {
      return res.status(500).json({ error: "Error en el servidor", details: err instanceof Error ? err.message : err });
    }
  }

  async getClienteById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const cliente = await this.app.getClienteById(id);
      if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ error: "Error en el servidor", details: error instanceof Error ? error.message : error });
    }
  }

  async getAllClientes(_req: Request, res: Response): Promise<Response> {
    try {
      const clientes = await this.app.getAllClientes();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener clientes", details: error instanceof Error ? error.message : error });
    }
  }

  async updateCliente(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const schema = Joi.object({
        nombre: Joi.string().min(2),
        email: Joi.string().email(),
        telefono: Joi.string().pattern(/^[0-9]{7,15}$/),
        direccion: Joi.string().min(5),
        estado: Joi.number().valid(0, 1),
        contrasena: Joi.string().min(8),
      });

      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const updated = await this.app.updateCliente(id, value as ClienteUpdateDto);
      if (!updated) return res.status(404).json({ error: "Cliente no encontrado o sin cambios" });
      return res.status(200).json({ message: "Cliente actualizado con éxito" });
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar cliente", details: error instanceof Error ? error.message : error });
    }
  }

  async deleteCliente(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const deleted = await this.app.deleteCliente(id);
      if (!deleted) return res.status(404).json({ error: "Cliente no encontrado" });
      return res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar cliente", details: error instanceof Error ? error.message : error });
    }
  }
}

