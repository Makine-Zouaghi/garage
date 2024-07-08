import express, { type Request, type Response, type Router } from "express";
import BrandController from "../controller/brand_controller.js";

class BrandRouter{
    private router: Router = express.Router();

    public getRouter = (): Router => {
        /*
        lister les routes associées au prefix du routeur 
        une route est relier une une url est a une methode http (GET, PUT, POST, DELETE)
        */
        this.router.get("/", new BrandController().index);
        
        //route avec une v  riable de route; préceder d'un :
        this.router.get("/:id", new BrandController().one);
        
        return this.router;     
    }
};

export default BrandRouter;