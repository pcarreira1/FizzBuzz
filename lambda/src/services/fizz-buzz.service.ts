const GAME_CONFIG: { divider: number, result: string }[] = [
	{ divider: 3, result: "fizz" },
	{ divider: 5, result: "buzz" }
];

export function fizzBuzz(number: number): string | null {
	const results = GAME_CONFIG
		.map(({ divider, result }) => number % divider === 0 ? result : null)
		.filter(result => result !== null);

	return !results.length ? null : results.join("");
}