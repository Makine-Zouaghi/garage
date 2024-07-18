import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

class AuthorizationMiddleware {
    // methode resevant la liste des roles autorisés
	public authorize = (roles: string[]) => {
        console.log(roles);
        
        // retourner un middleware
        return (req: Request, res: Response, next: NextFunction) => {
            // recuperer le token contenu dans l'en tete authorization
            const token = (req.headers.authorization as string).split(" ")[1];
    
            // verifier la validité du token
            try {
                const verifyToken = jwt.verify(token, process.env.SECRET as string);
            } catch (error) {
                return res.status(401).json({
                    status: 401,
                    message: "Unauthorized",
                });
            }
    
            // recuperer le payload du token
            const data = jwt.decode(token) as JwtPayload;
    
    
            // verification des autorisation
            // if (data.user.role.name !== "admin"){
            // chercher le role de l'utilisateur dans la liste des roles utiliser
            if (roles.indexOf(data.user.role.name) === -1){
                return res.status(401).json({
                    status: 401,
                    message: "Unauthorized"
                });
            }
            // passer au middleware suivant
            next();
        };

    }
    
}

export default AuthorizationMiddleware;
