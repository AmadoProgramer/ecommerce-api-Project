import Joi from "joi";

export interface ClienteCreateDto {
  nombre: string;
  email: string;
  contrasena: string;
  telefono: string;
  cedula: string;
  direccion: string;
  estado: number;
}

export const ClienteCreateSchema = Joi.object<ClienteCreateDto>({
  nombre: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  contrasena: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,25}$/)
    .required(),
  telefono: Joi.string().pattern(/^\d{7,15}$/).required(),
  cedula: Joi.string().length(10).required(),
  direccion: Joi.string().min(5).required(),
});

