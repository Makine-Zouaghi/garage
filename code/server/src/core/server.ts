import express, { type Router, type Express, type Request, type Response } from "express";
import http from "node:http";


class Server{
    // propriétés
    private app:Express = express();
    private router:Router = express.Router();

    // constructeur
    constructor(){
        this.app.use(this.router)

        this.getRoutes();
    }

    // méthodes
    private getRoutes = (): void => {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('homepage');
        });
    };

    public createServer = ():http.Server => {
        return http.createServer(this.app);
    };
}

export default Server;