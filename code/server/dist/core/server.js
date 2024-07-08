import express from "express";
import http from "node:http";
import HomepageRouter from "../router/home page_router.js";
import NotFoundRouter from "../router/not_found_router.js";
import BrandRouter from "../router/brand_router.js";
class Server {
    // propriétés
    app = express();
    router = express.Router();
    // constructeur
    constructor() {
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
        this.router.use('/', new HomepageRouter().getRouter());
        this.router.use('/brand', new BrandRouter().getRouter());
        // le routeur Not Found doit etre obligatoirmet appelé en dernière position
        this.router.use('*', new NotFoundRouter().getRouter());
    };
    createServer = () => {
        return http.createServer(this.app);
    };
}
export default Server;
