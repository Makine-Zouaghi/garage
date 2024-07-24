import supertest, { type Response } from "supertest";
import { describe, expect, it } from "vitest";
import Server from "../../src/core/server";
import type Role from "../../src/models/role";
import type User from "../../src/models/user";
import type Brand from "../../src/models/brand";
import type Option from "../../src/models/option";
import type Vehicule from "../../src/models/vehicule";
import jwt from "jsonwebtoken";

// créer un groupe de tests
describe("vehicule controller tests suite", async () => {
	// route principale appelée par les tests de ce fichier
	const route = "/vehicule";

	// créer un admin
	const role: Role = {
		id: 1,
		name: "admin",
	};

	const admin: User = {
		id: 1,
		email: "admin@admin.fr",
		password: "admin",
		roles_id: 1,
		role: role,
	};

	// cree un vehicule
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
		brand: {},
		options: [],
		options_id: "1,2,3",
	};

	// créer un test
	it("should return a status code with 200", async () => {
		// valeur attendue
		const expected = 200;

		// sut (system under test)
		const sut: Response = await supertest(new Server().createServer()).get(
			route,
		);

		const actual = sut.status;

		// assertion
		expect(actual).toBe(expected);
	});

	it("should return data", async () => {
		// valeur attendue
		const minValue = 0;

		// sut (system under test)
		const sut: Response = await supertest(new Server().createServer()).get(
			route,
		);

		const actual = sut.body.data.length;

		// assertion
		expect(actual).toBeGreaterThan(minValue);
	});

	it("should create a new entry in database", async () => {
		// valeur attendue
		const expected = 201;

		// generer un jwt
		const token = jwt.sign(
			{
				user: admin,
			},
			process.env.SECRET as string,
			{
				expiresIn: 30,
			},
		);
		// sut
		const sut: Response = await supertest(new Server().createServer())
			.post(route)
			.auth(token, { type: "bearer" })
			.send(data);

		const actual = sut.status;

		// console.log(sut);

		// assertion
		// expect(actual).toBe(expected)
	});
});
