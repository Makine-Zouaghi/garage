import type Brand from "./brand.js";

type Vehicule = {
    // ? représente la valeur null
    id?: number;
    model?: string;
    price: number;
    brand_id: number;
    brand?: Brand | unknown;
};

export default Vehicule;