import { ClienteService } from "../../application/ClienteService";
import { Cliente } from "../../domain/cliente/Cliente";
import { Request, Response } from "express";

export class ClienteController {
  private app: ClienteService;

  constructor(app: ClienteService) {
    this.app = app;
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, contrasena } = req.body;
      // Validaciones básicas
      console.log("Login request received:", { email, contrasena });
      if (!email || !contrasena) {
        return res
          .status(400)
          .json({ error: "Email y contraseña son requeridos" });
      }
      if (
        !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.trim())
      ) {
        return res
          .status(400)
          .json({ error: "Correo electrónico no válido" });
      }

      // Delego toda la lógica de autenticación al servicio
      const token = await this.app.login(email.trim(), contrasena.trim());
      return res.status(200).json({ token });
    } catch (err) {
      // Si tira “Credenciales incorrectas” devolvemos 401,
      // otro tipo de error → 500
      const msg = err instanceof Error ? err.message : String(err);
      if (msg === "Credenciales incorrectas") {
        return res.status(401).json({ error: msg });
      }
      return res
        .status(500)
        .json({ error: "Error en el servidor", details: msg });
    }
  }

  async createCliente(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre, email, contrasena, telefono, cedula, direccion, estado } = req.body;

      // Validaciones básicas
      if (!nombre || !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre.trim())) {
        return res.status(400).json({ error: "Nombre inválido" });
      }

      if (!email || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
        return res.status(400).json({ error: "Correo electrónico no válido" });
      }

      if (!telefono || !/^\d{7,15}$/.test(telefono.trim())) {
        return res.status(400).json({ error: "Teléfono inválido (mín. 7 dígitos)" });
      }
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,25}$/.test(
          contrasena.trim()
        )
      )
        return res.status(400).json({
          error:
            "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
        });
        if (!cedula || !/^\d{10}$/.test(cedula.trim()))
        return res.status(400).json({ error: "Cédula inválida (10 dígitos)" });
        if (!direccion || direccion.trim().length < 5) {
        return res.status(400).json({ error: "Dirección inválida (mín. 5 caracteres)" });
        }

      const cliente: Omit<Cliente, "id"> = { nombre, email, contrasena, telefono, cedula, direccion, estado: 1 };
      const idCliente = await this.app.createCliente(cliente);
      return res.status(201).json({ message: "Cliente creado con éxito", idCliente });
    } catch (error) {
      return res.status(500).json({ error: "Error en el servidor", details: error instanceof Error ? error.message : error });
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

      const { nombre, email, telefono, estado } = req.body;

      // Validaciones
      if (nombre && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre.trim())) {
        return res.status(400).json({ error: "Nombre inválido" });
      }

      if (email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
        return res.status(400).json({ error: "Correo electrónico no válido" });
      }

      if (telefono && !/^\d{7,15}$/.test(telefono.trim())) {
        return res.status(400).json({ error: "Teléfono inválido" });
      }

      const updated = await this.app.updateCliente(id, { nombre, email, telefono, estado });
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