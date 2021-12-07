import 'jest';
import { fizzBuzzHandler } from "./lambda"
import { APIGatewayProxyEvent } from 'aws-lambda';

jest.mock('./services/fizz-buzz.service', () => ({ fizzBuzz: jest.fn((number) => {
	if(number === 1) return "buzz"
 	return null;
}) }));

describe("lambda", () => {
	describe("fizzBuzzHandler", () => {
		describe("When the body is empty", () => {
			it("Should return a valid error object", async () => {
				const event: APIGatewayProxyEvent = { body: "{}" } as any;
				expect(await fizzBuzzHandler(event)).toStrictEqual({
					statusCode: 400,
					body: JSON.stringify({ error: "Invalid input" }),
					headers: { "Content-Type": "application/json" }
				});
			});
		});

		describe("When the body have a invalid number property", () => {
			it("Should return a valid error object", async () => {
				const event: APIGatewayProxyEvent = { body: "{\"number\": \"invalid\"}" } as any;
				expect(await fizzBuzzHandler(event)).toStrictEqual({
					statusCode: 400,
					body: JSON.stringify({ error: "Invalid input" }),
					headers: { "Content-Type": "application/json" }
				});
			});
		});

		describe("When the fizzbuzz service returns a string", () => {
			it("Should return a success response with buzz result", async () => {
				const event: APIGatewayProxyEvent = { body: "{\"number\": 1 }" } as any;
				expect(await fizzBuzzHandler(event)).toStrictEqual({
					statusCode: 200,
					body: JSON.stringify({ number: 1, result: "buzz" }),
					headers: { "Content-Type": "application/json" }
				});
			});
		});

		describe("When the fizzbuzz service returns null", () => {
			it("Should return a success response with input number as result", async () => {
				const event: APIGatewayProxyEvent = { body: "{\"number\": 2 }" } as any;
				expect(await fizzBuzzHandler(event)).toStrictEqual({
					statusCode: 200,
					body: JSON.stringify({ number: 2, result: "2" }),
					headers: { "Content-Type": "application/json" }
				});
			});
		});
	});
});