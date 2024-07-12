import type { Request, Response } from "express";
import BrandRepository from "../repository/brand_repository.js";

class BrandController {
    private brandRepository: BrandRepository = new BrandRepository;

    // méthodes appellées par le routeur
    public index = async (req: Request, res: Response):
        Promise<Response> => {
        const results = await this.brandRepository.selectAll();


        //si une erreur est renvoyé

        if (results instanceof Error) {
            //en l'environement developpement
            return process.env.NODE_ENV === 'dev' ? res.json
                (results) : res.status(400).json({
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


    public one = async (req: Request, res: Response):
        Promise<Response> => {
        //req.params permet de récupérer les variables de route 

        console.log(req.params);


        const results = await this.brandRepository.selectOne(req.params);


        //si une erreur est renvoyé

        if (results instanceof Error) {
            //en l'environement developpement
            return process.env.NODE_ENV === 'dev' ? res.json
                (results) : res.status(400).json({
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