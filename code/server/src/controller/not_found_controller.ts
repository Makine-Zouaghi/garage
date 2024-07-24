import type { Request, Response } from "express";

class NotFoundController {
	// méthodes appellées par le routeur
	public index = (req: Request, res: Response): Response => {
		return res.status(404).json({
			status: 404,
			message: "Not found",
		});
	};
}

export default NotFoundController;
