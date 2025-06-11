/*
Este módulo se encarga de:
- Cargar variables de entorno desde .env
- Validarlas con Joi
- Exportarlas como objeto tipado
*/

import * as joi from "joi";
import "dotenv/config";

// Tipado de variables esperadas
export type ReturnEnvironmentVars = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SCHEMA: string;
  JWT_SECRET: string;
};

type ValidationEnvironmentVars = {
  error: joi.ValidationError | undefined;
  value: ReturnEnvironmentVars;
};

// Validación de Joi
function validateEnvVars(vars: NodeJS.ProcessEnv): ValidationEnvironmentVars {
  const envSchema = joi
    .object({
      PORT: joi.number().required(),
      DB_HOST: joi.string().required(),
      DB_PORT: joi.number().default(5432),
      DB_USER: joi.string().required(),
      DB_PASSWORD: joi.string().allow("").optional(),
      DB_NAME: joi.string().required(),
      DB_SCHEMA: joi.string().required(),
      JWT_SECRET: joi.string().required()
    })
    .unknown(true);

  const { error, value } = envSchema.validate(vars);
  return { error, value };
}

// Carga final
const loadEnvVars = (): ReturnEnvironmentVars => {
  const result = validateEnvVars(process.env);
  if (result.error) {
    throw new Error(` Error loading environment variables: ${result.error.message}`);
  }
  return {
    PORT: result.value.PORT,
    DB_HOST: result.value.DB_HOST,
    DB_PORT: result.value.DB_PORT,
    DB_USER: result.value.DB_USER,
    DB_PASSWORD: String(result.value.DB_PASSWORD),
    DB_NAME: result.value.DB_NAME,
    DB_SCHEMA: result.value.DB_SCHEMA,
    JWT_SECRET: result.value.JWT_SECRET
  };
};

const envs = loadEnvVars();
export default envs;
