import config from "../config/config";
import { connectToSqlServer } from "../DB/config";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import "colors";
import i18n from "../config/i18n";
import fileUpload from 'express-fileupload';
import { swaggerDocs, swaggerUi } from '../helpers/swagger';
//routes

import ticketDataRouter from "../routes/TicketData.Router";


class Server {
  private app: Application;
  private port: string;
  private path: any;

  constructor() {
    this.app = express();
    this.port = config.port || '8080';
    this.path = {    
      url: "/ticketback",
    };

    // Conectar a bd
    this.conectarDB();
    // Middlwares
    this.middlewares();
    // Mis rutas
    this.routes();

    // cors proteger nuestra api para que solo reciba peticiones de cierto lugar
    // listas blancas y listas negras
  }

  async conectarDB() {
    // concection of bd
    await connectToSqlServer();
  }

  configurarCORS() {
    const corsOptions = {
        origin: process.env.URL_FRONT, 
        methods: ["GET", "POST", "PUT", "DELETE"], 
        allowedHeaders: ["Content-Type", "Authorization"], 
        optionsSuccessStatus: 200 
    };

    this.app.use(cors(corsOptions));
}

  middlewares() {
    // CORS
    this.app.use(cors());
    // Directorio publico
    this.app.use(express.static("public"));
    // resposes json
    this.app.use(express.json());
    // responses
    this.app.use(morgan("dev"));
    // subir archivos
    // this.app.use(
    //   fileUpload({
    //     limits: { fileSize: 5 * 1024 * 1024 },
    //     useTempFiles: true,
    //     tempFileDir: "./tmp/",
    //     createParentPath: true,
    //   })
    // );
    this.app.use(fileUpload({
      useTempFiles: false,  // Desactiva archivos temporales
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB de límite
      abortOnLimit: true,
      createParentPath: true
  }));
    // translator handler 
    this.app.use(i18n.init);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  routes() {
    // Ruta para la raíz
    this.app.get('/', (req, res) => {
      res.send('API funcionando');
    });
    // example
    this.app.use(this.path.url, ticketDataRouter);
    
  }
  
  listen() {
    console.clear();
    this.app.listen(this.port, () => {
      console.log(` 🔥 Server in port ${this.port}`.bold);
    });
  }
}

export default Server;
