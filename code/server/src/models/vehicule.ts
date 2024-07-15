import type Brand from "./brand.js";
import type Option from "./option.js";

type Vehicule = {
	// ? représente la valeur null
	id?: number;
	model?: string;
	price?: number;
	brand_id?: number;
	brand?: Brand | unknown;
	// liste des identifiants des options
	options_id?: string;
	options?: Option[] | unknown;
};

export default Vehicule;
