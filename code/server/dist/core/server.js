import express from "express";
import http from "node:http";
class Server {
    // propriétés
    app = express();
    router = express.Router();
    // constructeur
    constructor() {
        this.app.use(this.router);
        this.getRoutes();
    }
    // méthodes
    getRoutes = () => {
        this.router.get('/', (req, res) => {
            res.send('homepage');
        });
    };
    createServer = () => {
        return http.createServer(this.app);
    };
}
export default Server;
