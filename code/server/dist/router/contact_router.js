import express from "express";
import ContactController from "../controller/contact_controller.js";
class ContactRouter {
    router = express.Router();
    getRouter = () => {
        /*
        lister les routes associées au prefix du routeur
        une route est relier une une url est a une methode http (GET, PUT, POST, DELETE)
        */
        this.router.get("/", new ContactController().index);
        this.router.post("/", new ContactController().create);
        return this.router;
    };
}
export default ContactRouter;
