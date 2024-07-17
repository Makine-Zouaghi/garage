import type { Request, Response } from "express";
import SecurityRepository from "../repository/security_repository.js";
import argon2 from "argon2";
import type { QueryResult } from "mysql2";
import type User from "../models/user.js";

class SecurityController {
	private securityRepository: SecurityRepository = new SecurityRepository();

	// méthodes appellées par le routeur
	public register = async (req: Request, res: Response): Promise<Response> => {
		// hacher le mot de passe
		const hash = await argon2.hash(req.body.password);

		// remplacer le mot ed passe dans body par la version hachée
		req.body = { ...req.body, password: hash };

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

	public login = async (req: Request, res: Response): Promise<Response> => {
		// recuperer l'utilisateur par son mail
		const user: QueryResult | unknown =
			await this.securityRepository.getUserByEmail(req.body);
		// console.log(user);
		
		// sin l'utilisateur n'éxiste pas
		if (user instanceof Error) {
			return res.status(400).json({
				status: 400,
				message: "error, user does not exist",
			});
		}


		// verifier le mot de passe: comparer le mot de passe saisi avec le hash contenu dans la basse
		const isPasswordValid: boolean = await argon2.verify(
			(user as User).password as string,
			req.body.password,
		);

		if(!isPasswordValid) {
			return res.status(403).json({
				status: 403,
				message: "Forbidden",
			});
		}


		// si l'utilisateur existe et que le mot de passe est correct
		return res.status(200).json({
			statut: 200,
			message: "ok",
			data: user,
		});
	};
}

export default SecurityController;
