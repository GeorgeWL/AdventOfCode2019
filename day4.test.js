// console.log('Hello Advent');

/*
 * 6 Digit Number
 * Is contained within input
 * Two digits adjacent digits (e.g. `22` in 1`22`345)
 * Only ever Increase or stay the same
 */

const TEST_SIMPLE = '111111';
const TEST_SIMPLE_ASC = '112345';
const TEST_FAILURE_DECREASE = '223450';
const TEST_FAILURE_DECREASE_DOUBLE = '111110';
const TEST_FAILURE_NO_DOUBLE = '123456';
const TEST_FAILURE_LENGTH = '12345';

async function searchPasswords(input) {
	let containsPass = false;
	let matches;
	let reason;
	if (input.length !== 6) {
		reason = 'Expect Input Length of 6';
		return { containsPass, reason, matches };
	} else {
		const dupeCheck = Array.from(await checkPasswordRules(input));
		containsPass = dupeCheck.length >= 1;
		matches = dupeCheck;
		reason = containsPass
			? 'Contains Two or More Matching Adjacent'
			: 'Does not contain pass';
		return { containsPass, reason, matches };
	}
}

async function checkPasswordRules(input) {
	let prevDigit;
	let currentDigit;
	const matches = new Set();
	let hasDesc = false;
	const prevDigits = [];
	return new Promise((resolve, reject) => {
		input.split('').forEach((digit, index) => {
			currentIndex = index + 1;
			currentDigit = digit;
			currentDigit === prevDigit && matches.add(`${prevDigit}${currentDigit}`);
			prevDigit = digit;
			prevDigits.push(digit);
			hasDesc = prevDigits.some(int => digit < int);
			hasDesc === true && matches.clear();
			if (currentIndex === input.length) {
				resolve(matches);
			}
		});
	});
}

async function passwordsInRange(start, end) {
	const results = Array(end - start + 1)
		.fill()
		.map((_, index) => start + index)
		.fill(start, end)
		.map(async i => await searchPasswords(i.toString()));
	return Promise.all(results);
}
jest.setTimeout(120000);

describe('simple test', () => {
	test('should fail if length !==6', async () => {
		const res = await searchPasswords(TEST_FAILURE_LENGTH);
		expect(res.reason).toBe('Expect Input Length of 6');
		expect(res.containsPass).toBe(false);
	});
	test('should fail if later descend', async () => {
		const res = await searchPasswords(TEST_FAILURE_DECREASE);
		expect(res.reason).toBe('Does not contain pass');
		expect(res.containsPass).toBe(false);
	});
	test('should fail if later descend', async () => {
		const res = await searchPasswords(TEST_FAILURE_DECREASE_DOUBLE);
		expect(res.reason).toBe('Does not contain pass');
		expect(res.containsPass).toBe(false);
	});
	test('should fail if no double', async () => {
		const res = await searchPasswords(TEST_FAILURE_NO_DOUBLE);
		expect(res.reason).toBe('Does not contain pass');
		expect(res.containsPass).toBe(false);
	});
	test('should pass double - all same digit', async () => {
		const res = await searchPasswords(TEST_SIMPLE);
		expect(res.containsPass).toBe(true);
	});
	test('should pass double - one pair', async () => {
		const res = await searchPasswords(TEST_SIMPLE_ASC);
		expect(res.containsPass).toBe(true);
	});
	test('get passwords in range', async () => {
		const res = await passwordsInRange(111110, 111121);
		expect(res).toHaveLength(12);
		expect(res.filter(item => item.containsPass)).toHaveLength(9);
	});
});

passwordsInRange(254032, 789860).then(res => {
	console.log(res.filter(item => item.containsPass).length);
	return res;
});
