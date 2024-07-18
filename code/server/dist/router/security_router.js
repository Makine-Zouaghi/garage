import express from "express";
import SecurityController from "../controller/security_controller.js";
class SecurityRouter {
    router = express.Router();
    getRouter = () => {
        /*
        lister les routes associées au prefix du routeur
        une route est relier une une url est a une methode http (GET, PUT, POST, DELETE)
        */
        this.router.post("/register", new SecurityController().register);
        this.router.post("/login", new SecurityController().login);
        this.router.post("/auth", new SecurityController().auth);
        return this.router;
    };
}
;
export default SecurityRouter;
