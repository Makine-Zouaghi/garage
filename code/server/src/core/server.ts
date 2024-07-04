import express, { type Router, type Express, type Request, type Response } from "express";
import http from "node:http";
import HomepageRouter from "../router/home page_router.js";
import NotFoundRouter from "../router/not_found_router.js";


class Server{
    // propriétés
    private app:Express = express();
    private router:Router = express.Router();

    // constructeur
    constructor(){
        // lier le routeur
        this.app.use(this.router)

        this.listRouters();
    }

    // méthodes
    private listRouters = (): void => {
        /*
        appel d'un routeur :
            -préfixe de toutes les routes contenurs dans le routeur
            -routeur
        */ 
        this.router.use('/', new HomepageRouter().getRouter());

        // le routeur Not Found doit etre obligatoirmet appelé en dernière position
        this.router.use('*', new NotFoundRouter().getRouter()); 
    };

    public createServer = ():http.Server => {
        return http.createServer(this.app);
    };
}

export default Server;