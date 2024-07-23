import { describe, expect, it } from "vitest";
import type Vehicule from "../../src/models/vehicule";
import type Brand from "../../src/models/brand";
import type Option from "../../src/models/option";
import VehiculeValidator from "../../src/validator/vehicule_validator";
import { ValidationError } from "joi";

// créer une suite de tests
describe("vehicule validator tests suite", () => {
	// créer des fausses données
	const brand: Brand = {
		id: 1,
		name: "brand",
	};

	const options: Option[] = [
		{ id: 1, name: "option1" },
		{ id: 2, name: "option2" },
		{ id: 3, name: "option3" },
	];

	const data: Vehicule = {
		id: 1,
		brand_id: 1,
		model: "model",
		price: 2000,
		brand: brand,
		options: options,
		options_id: "1,2,3",
	};

	// sut : system under test , méthode ou la fonction testée
	const sut: VehiculeValidator = new VehiculeValidator();

	// créer un test
	it("should return true", () => {
		// valeur attendue
		const expected = true;

		// comment obtenir la valeur attendue
		const actual = sut.validate(data);

		// assertion
		// jest : asserion debute par to...
		expect(actual).toBeTruthy();

		// chai : accés  direct à des méthodes d'insertions
	});

	// deuxième test
	it("should return an error", async () => {
		// données renvoyant une erreur
		const falseData = { ...data, model: "a", price: -1111 };

		// comment obtenir la valeur attendue
		const actual = await sut.validate(falseData);

        // assertions
        expect(actual).toBeInstanceOf(ValidationError);
	});
});
