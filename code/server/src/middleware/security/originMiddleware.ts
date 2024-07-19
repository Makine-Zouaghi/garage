import type { NextFunction, Request, Response } from "express";

class OriginMiddleware {
	public check = (req: Request, res: Response, next: NextFunction) => {
        const protocol:string = req.protocol;

        // recuperrer l'hote
        const host:string = req.get("host") as string;

        // verifier la présence de lorigine dans la liste
        const origin = `${protocol}://${host}`;

        // liste des originees autorisées
        const listOrigins: string[] = (process.env.ORIGINS as string).split(',');

        // verifier la présence de l'origine dans la liste
        if(listOrigins.indexOf(origin) === -1 && host !== 'localhost' && host !== "127.0.0.1") {
            return res.status(403).json({
                status: 403,
                message: "Forbidden origin",
            });
        };
        

        // passe au middleware suivant
        next();
    };
}

export default OriginMiddleware;
