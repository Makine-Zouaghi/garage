import type { Request, Response } from "express";

class NotFoundController{
    // méthodes appellées par le routeur
    public index = (req: Request, res: Response): Response => {
        return res.send("not found -GET");
    };
}

export default NotFoundController;