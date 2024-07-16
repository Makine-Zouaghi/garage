import type { Request, Response } from "express";
import SecurityRepository from "../repository/security_repository.js";
import argon2  from "argon2";

class SecurityController {
    private securityRepository: SecurityRepository = new SecurityRepository();


	// méthodes appellées par le routeur
	public register = async (req: Request, res: Response): Promise<Response> => {
		// hacher le mot de passe 
		const hash = await argon2.hash(req.body.password);
		
		// remplacer le mot ed passe dans body par la version hachée
		req.body = {...req.body, password: hash};

		const results = await this.securityRepository.register(req.body);

		//si une erreur est renvoyé

		if (results instanceof Error) {
			//en l'environement developpement
			return process.env.NODE_ENV === "dev"
				? res.json(results)
				: res.status(400).json({
						status: 400,
						message: "Error",
					});
		}

		return res.status(201).json({
			status: 201,
			message: "user created",
			data: results,
		});
	};
}

export default SecurityController;
