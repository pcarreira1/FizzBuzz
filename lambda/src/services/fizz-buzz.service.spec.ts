import 'jest';
import { fizzBuzz } from "./fizz-buzz.service"

describe("fizz-buzz service", () => {
	describe("fizzBuzz", () => {
		describe("When the number is divided only by 3", () => {
			it("Should return fizz", () => {
				expect(fizzBuzz(-3)).toEqual("fizz");
				expect(fizzBuzz(3)).toEqual("fizz");
				expect(fizzBuzz(6)).toEqual("fizz");
				expect(fizzBuzz(9)).toEqual("fizz");
				expect(fizzBuzz(12)).toEqual("fizz");
				expect(fizzBuzz(18)).toEqual("fizz");
			});
		});

		describe("When the number is divided only by 5", () => {
			it("Should return buzz", () => {
				expect(fizzBuzz(-5)).toEqual("buzz");
				expect(fizzBuzz(5)).toEqual("buzz");
				expect(fizzBuzz(10)).toEqual("buzz");
				expect(fizzBuzz(20)).toEqual("buzz");
				expect(fizzBuzz(25)).toEqual("buzz");
				expect(fizzBuzz(35)).toEqual("buzz");
			});
		});

		describe("When the number is divided by 3 and 5", () => {
			it("Should return fizzbuzz", () => {
				expect(fizzBuzz(0)).toEqual("fizzbuzz");
				expect(fizzBuzz(15)).toEqual("fizzbuzz");
				expect(fizzBuzz(30)).toEqual("fizzbuzz");
				expect(fizzBuzz(45)).toEqual("fizzbuzz");
			});
		});

		describe("When the number is not divided by 3 and/or 5", () => {
			it("Should return null", () => {
				expect(fizzBuzz(-17)).toBeNull();
				expect(fizzBuzz(-2)).toBeNull();
				expect(fizzBuzz(-1)).toBeNull();
				expect(fizzBuzz(1)).toBeNull();
				expect(fizzBuzz(2)).toBeNull();
				expect(fizzBuzz(17)).toBeNull();
			});
		});
	});
});