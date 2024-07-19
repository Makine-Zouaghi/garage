import express from "express";
import http from "node:http";
import HomepageRouter from "../router/home page_router.js";
import NotFoundRouter from "../router/not_found_router.js";
import BrandRouter from "../router/brand_router.js";
import VehiculeRouter from "../router/vehicule_router.js";
import SecurityRouter from "../router/security_router.js";
import cors from "cors";
import OriginMiddleware from "../middleware/security/originMiddleware.js";
class Server {
    // propriétés
    app = express();
    router = express.Router();
    // constructeur
    constructor() {
        // activer le midleware JSON, permet d'accéder à la propriété body de la requete HTTP en JSON
        this.router.use(express.json());
        // gerer CORS (cross origin resources sharing)
        this.router.use(cors({
            origin: process.env.ORIGINS?.split(","),
        }));
        // vérifier l'origine de la requete
        this.router.use(new OriginMiddleware().check);
        // lier le routeur
        this.app.use(this.router);
        this.listRouters();
    }
    // méthodes
    listRouters = () => {
        /*
        appel d'un routeur :
            -préfixe de toutes les routes contenurs dans le routeur
            -routeur
        */
        this.router.use("/", new HomepageRouter().getRouter());
        this.router.use("/brand", new BrandRouter().getRouter());
        this.router.use("/vehicule", new VehiculeRouter().getRouter());
        this.router.use("/", new SecurityRouter().getRouter());
        // le routeur Not Found doit etre obligatoirmet appelé en dernière position
        this.router.use("*", new NotFoundRouter().getRouter());
    };
    createServer = () => {
        return http.createServer(this.app);
    };
}
export default Server;
