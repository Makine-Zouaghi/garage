import VehiculeValidator from "../../validator/vehicule_validator.js";
class VehiculeValidatorMiddleware {
    // verifier les contraintes de validation
    filter = async (req, res, next) => {
        // valider selon les contraintes de validation
        const validation = await new VehiculeValidator().validate(req.body);
        // si une erreur de validation est renvoyée
        if (validation instanceof Error) {
            return res.status(400).json({
                status: 400,
                message: "Error",
                data: validation.details.map((value) => value.message),
            });
        }
        // passer au middleware suivant
        next();
    };
}
export default VehiculeValidatorMiddleware;
