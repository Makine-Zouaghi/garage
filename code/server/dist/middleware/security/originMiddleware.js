class OriginMiddleware {
    check = (req, res, next) => {
        const protocol = req.protocol;
        // recuperrer l'hote
        const host = req.get("host");
        // verifier la présence de lorigine dans la liste
        const origin = `${protocol}://${host}`;
        // liste des originees autorisées
        const listOrigins = process.env.ORIGINS.split(',');
        // verifier la présence de l'origine dans la liste
        if (listOrigins.indexOf(origin) === -1 && host !== 'localhost' && host !== "127.0.0.1") {
            return res.status(403).json({
                status: 403,
                message: "Forbidden origin",
            });
        }
        ;
        // passe au middleware suivant
        next();
    };
}
export default OriginMiddleware;
