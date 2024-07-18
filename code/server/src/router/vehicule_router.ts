import express, { type Request, type Response, type Router } from "express";
import VehiculeController from "../controller/vehicule_controller.js";
import VehiculeValidatorMiddleware from "../middleware/validator/vehicule_validator_middleware.js";
import AuthorizationMiddleware from "../middleware/security/authorizationMiddleware.js";

class VehiculeRouter {
	private router: Router = express.Router();

	public getRouter = (): Router => {
		/*
        lister les routes associées au prefix du routeur 
        une route est relier une une url est a une methode http (GET, PUT, POST, DELETE)
        */
		this.router.get("/", new VehiculeController().index);

		//route avec une v  riable de route; préceder d'un :
		this.router.get("/:id", new VehiculeController().one);

		// route pour créer un vehicule
		// ajout d'un middleware de validation
		// ajout d'un middleware pour les autorisation
		this.router.post("/", 
		new AuthorizationMiddleware().authorize(['admin']), 
		new VehiculeValidatorMiddleware().filter, 
		new VehiculeController().create);

		// route pour modifier un vehicule 
		this.router.put("/:id", new VehiculeController().update);

		// route pour suprimer un vehicule
		this.router.delete("/:id", new VehiculeController().delete);

		return this.router;
	};
}

export default VehiculeRouter;
