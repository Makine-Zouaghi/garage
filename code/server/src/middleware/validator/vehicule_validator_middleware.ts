import type { NextFunction, Request, Response } from "express";
import VehiculeValidator from "../../validator/vehicule_validator.js";
import type { ValidationError } from "joi";
import type Joi from "joi";

class VehiculeValidatorMiddleware {
	// verifier les contraintes de validation
	public filter = async (req: Request, res: Response, next: NextFunction) => {
		// valider selon les contraintes de validation
		const validation = await new VehiculeValidator().validate(req.body);

		// si une erreur de validation est renvoyée
		if (validation instanceof Error) {
			return res.status(400).json({
				status: 400,
				message: "Error",
				data: (validation as ValidationError).details.map(
					(value: Joi.ValidationErrorItem) => value.message,
				),
			});
		}
        
		// passer au middleware suivant
		next();
	};
}

export default VehiculeValidatorMiddleware;
