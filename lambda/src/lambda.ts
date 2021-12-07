import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { fizzBuzz } from "./services/fizz-buzz.service";

function isValidBody(number: any) {
	if (!number || !Number.isInteger(number)) {
		return false;
	}

	return true;
}

export const fizzBuzzHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	const { number } = JSON.parse(event.body);

	if (!isValidBody(number)) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: "Invalid input" }),
			headers: { 'Content-Type': 'application/json' }
		}
	}

	const result = fizzBuzz(number);
	return {
		statusCode: 200,
		body: JSON.stringify({
			number,
			result: result || number.toString()
		}),
		headers: { 'Content-Type': 'application/json' }
	}
}