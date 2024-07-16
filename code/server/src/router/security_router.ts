import express, { type Request, type Response, type Router } from "express";
import SecurityController from "../controller/security_controller.js";

class SecurityRouter{
    private router: Router = express.Router();

    public getRouter = (): Router => {
        /*
        lister les routes associées au prefix du routeur 
        une route est relier une une url est a une methode http (GET, PUT, POST, DELETE)
        */
		this.router.post("/register", new SecurityController().register);
        return this.router;     
    }
};

export default SecurityRouter;