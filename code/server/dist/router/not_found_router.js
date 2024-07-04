import express from "express";
import NotFoundController from "../controller/not_found_controller.js";
class NotFoundRouter {
    router = express.Router();
    getRouter = () => {
        /*
        lister les routes associées au prefix du routeur
        une route est relier une une url est a une methode http (GET, PUT, POST, DELETE)
        */
        this.router.get("/", new NotFoundController().index);
        return this.router;
    };
}
;
export default NotFoundRouter;
