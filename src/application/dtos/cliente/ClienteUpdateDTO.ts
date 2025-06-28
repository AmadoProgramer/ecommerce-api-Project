import Joi from "joi";

export interface ClienteUpdateDto {
  nombre?: string;
  email?: string;
  contrasena?: string;
  telefono?: string;
  direccion?: string;
  estado?: number;
}

export const ClienteUpdateSchema = Joi.object<ClienteUpdateDto>({
  nombre: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  contrasena: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,25}$/),
  telefono: Joi.string().pattern(/^\d{7,15}$/),
  direccion: Joi.string().min(5),
  estado: Joi.number().valid(0, 1),
});
