import BrandRepository from "../repository/brand_repository.js";
class BrandController {
    brandRepository = new BrandRepository;
    // méthodes appellées par le routeur
    index = async (req, res) => {
        const results = await this.brandRepository.selectAll();
        //si une erreur est renvoyé
        if (results instanceof Error) {
            //en l'environement developpement
            return process.env.NODE_ENV === 'dev' ? res.json(results) : res.status(400).json({
                status: 400,
                message: 'Error',
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'OK',
            data: results,
        });
    };
    one = async (req, res) => {
        //req.params permet de récupérer les variables de route 
        console.log(req.params);
        const results = await this.brandRepository.selectOne(req.params);
        //si une erreur est renvoyé
        if (results instanceof Error) {
            //en l'environement developpement
            return process.env.NODE_ENV === 'dev' ? res.json(results) : res.status(400).json({
                status: 400,
                message: 'Error',
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'OK',
            data: results,
        });
    };
}
export default BrandController;
