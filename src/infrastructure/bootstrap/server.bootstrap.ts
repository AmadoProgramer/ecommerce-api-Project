import http from "http"; // Para hacer peticiones al servidor
import express from "express"; // Facilita los endpoints
export class ServerBoostrap {
  //Declarar atributos
  private app!: express.Application;
  constructor(app: express.Application) {
    this.app = app;
  }

  init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      //En esta promesa constatamos que se cree el servicio si no devuelva un error
      //Y adicionalmente que al iniciarse saber si se logro conectar exitosamente al puerto de entorno o el default.
      const server = http.createServer(this.app);
      const PORT = process.env.PORT || 4000;
      //Ahora debemos decirle al servidor que escuche por el puerto
      server
        .listen(PORT)
        .on("listening", () => {
          console.log(`Server is running at port: ${PORT}`);
          resolve(true);
        })
        .on("error", (err) => {
          console.log(`Error starting server at port: ${err}`);
          reject(err);
        });
    });
  }
}