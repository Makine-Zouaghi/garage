import Joi from "joi";
class VehiculeValidator {
    // valider les données d'un véhicule
    async validate(data) {
        // contraasync intes de validation
        // reprendre les propriétés du modèle
        const constraints = Joi.object({
            id: Joi.number().positive().allow(),
            model: Joi.string().min(2).max(50).required(),
            price: Joi.number().greater(0).required(),
            brand_id: Joi.number().positive().required(),
            brand: Joi.object().allow(),
            options_id: Joi.string(),
            options: Joi.array(),
        });
        try {
            // c'est pour avoir toute les erreur, de base il donne les erreur une par une
            const validation = await constraints.validateAsync(data, { abortEarly: false });
            return validation;
        }
        catch (error) {
            return error;
        }
    }
}
export default VehiculeValidator;
