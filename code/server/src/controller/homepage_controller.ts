import type { Request, Response } from "express";

class HomepageController{
    // méthodes appellées par le routeur
    public index = (req: Request, res: Response): Response => {
        return res.status(200).json({
            status: 200,
            message: "Garage API",
        });
    };
}

export default HomepageController;