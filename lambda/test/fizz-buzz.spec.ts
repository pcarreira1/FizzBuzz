import 'jest';
import { fizzBuzzHandler } from "../src/lambda"
import { APIGatewayProxyEvent } from 'aws-lambda';

describe("Fizz Buzz API", () => {
	describe("fizzBuzzHandler", () => {
		describe("When the user provide empty body", () => {
			it("Should return 400 error object", async () => {
				const event: APIGatewayProxyEvent = { body: JSON.stringify({}) } as any;
				expect(await fizzBuzzHandler(event)).toStrictEqual({
					statusCode: 400,
					body: JSON.stringify({ error: "Invalid input" }),
					headers: { "Content-Type": "application/json" }
				});
			});
		});

		describe("When the user provide a invalid number type", () => {
			it("Should return 400 error object", async () => {
				const event: APIGatewayProxyEvent = { body: JSON.stringify({ number: "invalid" }) } as any;
				expect(await fizzBuzzHandler(event)).toStrictEqual({
					statusCode: 400,
					body: JSON.stringify({ error: "Invalid input" }),
					headers: { "Content-Type": "application/json" }
				});
			});
		});

		describe("When the user provide a number divided only by 3", () => {
			it("Should return 200 response with fizz result", async () => {
				const event: APIGatewayProxyEvent = { body: JSON.stringify({ number: 3 }) } as any;
				expect(await fizzBuzzHandler(event)).toStrictEqual({
					statusCode: 200,
					body: JSON.stringify({ number: 3, result: "fizz" }),
					headers: { "Content-Type": "application/json" }
				});
			});
		});

		describe("When the user provide a number divided only by 5", () => {
			it("Should return 200 response with buzz result", async () => {
				const event: APIGatewayProxyEvent = { body: JSON.stringify({ number: 5 }) } as any;
				expect(await fizzBuzzHandler(event)).toStrictEqual({
					statusCode: 200,
					body: JSON.stringify({ number: 5, result: "buzz" }),
					headers: { "Content-Type": "application/json" }
				});
			});
		});

		describe("When the user provide a number divided by 3 and 5", () => {
			it("Should return 200 response with fizzbuzz result", async () => {
				const event: APIGatewayProxyEvent = { body: JSON.stringify({ number: 15 }) } as any;
				expect(await fizzBuzzHandler(event)).toStrictEqual({
					statusCode: 200,
					body: JSON.stringify({ number: 15, result: "fizzbuzz" }),
					headers: { "Content-Type": "application/json" }
				});
			});
		});
	});
});