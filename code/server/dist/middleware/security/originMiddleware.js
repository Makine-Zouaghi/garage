class OriginMiddleware {
    check = (req, res, next) => {
        // const protocol: string = req.protocol;
        // recuperrer l'hote
        // const host: string = req.get("host") as string;
        // verifier la présence de lorigine dans la liste
        const origin = req.get("origin");
        // liste des originees autorisées
        const listOrigins = process.env.ORIGINS.split(",");
        // console.log(listOrigins.indexOf(origin) === -1);
        // console.log(origin !== undefined);
        // verifier la présence de l'origine dans la liste
        if (listOrigins.indexOf(origin) === -1 && origin !== undefined) {
            return res.status(403).json({
                status: 403,
                message: "Forbidden origin",
            });
        }
        // passe au middleware suivant
        next();
    };
}
export default OriginMiddleware;
