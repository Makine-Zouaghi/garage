import express, { type Request, type Response, type Router } from "express";
import HomepageController from "../controller/homepage_controller.js";

class HomepageRouter{
    private router: Router = express.Router();

    public getRouter = (): Router => {
        /*
        lister les routes associées au prefix du routeur 
        une route est relier une une url est a une methode http (GET, PUT, POST, DELETE)
        */
		this.router.get("/", new HomepageController().index);
        return this.router;     
    }
};

export default HomepageRouter;