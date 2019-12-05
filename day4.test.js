// console.log('Hello Advent');

/*
 * 6 Digit Number
 * Is contained within input
 * Two digits adjacent digits (e.g. `22` in 1`22`345)
 * Only ever Increase or stay the same
 */

const CASE_SIMPLE = '111111';
const CASE_SIMPLE_ASC = '112345';
const CASE_FAILURE_DECREASE = '123450';
const CASE_FAILURE_DECREASE_DOUBLE = '223450';
const CASE_FAILURE_NO_DOUBLE = '123456';
const CASE_FAILURE_LENGTH = '12345';

async function searchPasswords(input) {
	let containsPass = false;
	let matches;
	let reason;
	if (input.length !== 6) {
		reason = 'Expect Input Length of 6';
		return { containsPass, reason, matches };
	} else {
		const dupeCheck = await checkPasswordRules(input);
		containsPass = dupeCheck.filter(res => res !== false).length >= 1;
		if (!checkNotDescending(input)) {
			containsPass = false;
		}
		matches = dupeCheck;
		reason = containsPass
			? 'Contains Two or More Matching Adjacent'
			: 'Does not contain pass';
		return { containsPass, reason, matches };
	}
}

function checkPasswordRules(input) {
	let prevDigit;
	let currentDigit;
	let currentIndex = 0;
	input = String(input);
	const results = input.split('').map((digit, index) => {
		currentIndex = index + 1;
		currentDigit = Number(digit);

		if (checkMatchPair(prevDigit, currentDigit) === true) {
			const res = `${prevDigit}${currentDigit}`;
			prevDigit = Number(digit);
			return res;
		} else {
			return false;
		}
	});
	if (currentIndex === input.length) {
		return results;
	}
}

function checkMatchPair(prevDigit, currentDigit) {
	return currentDigit === prevDigit;
}

function checkNotDescending(input) {
	const numbers = String(input)
		.split('')
		.map(int => Number(int));
	let lastGood = 0;
	const res = numbers.map(int => {
		const isgood = int >= lastGood;
		if (isgood) {
			lastGood = int;
		}
		return isgood;
	});
	return res.every(int => int === true);
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

describe('simple it', () => {
	describe('is double its', () => {
		it('should return false double', () => {
			const res = checkMatchPair(1, 2);
			expect(res).toBe(false);
		});
		it('should return false double', () => {
			const res = checkMatchPair(3, 2);
			expect(res).toBe(false);
		});

		it('should return true double', () => {
			const res = checkMatchPair(1, 1);
			expect(res).toBe(true);
		});
	});
	describe('isAscendingOnly', () => {
		it('should return true not descending - CASE_SIMPLE', () => {
			const res = checkNotDescending(CASE_SIMPLE);
			expect(res).toBe(true);
		});
		it('should return true not descending - CASE_SIMPLE_ASC', () => {
			const res = checkNotDescending(CASE_SIMPLE_ASC);
			expect(res).toBe(true);
		});
		it('should return false not descending', () => {
			const res = checkNotDescending(CASE_FAILURE_DECREASE);
			expect(res).toBe(false);
		});
		it('should return false not descending', () => {
			const res = checkNotDescending(CASE_FAILURE_DECREASE_DOUBLE);
			expect(res).toBe(false);
		});
	});
	describe('fail tests searchPasswords', () => {
		it('should fail if length !==6', async () => {
			const res = await searchPasswords(CASE_FAILURE_LENGTH);
			expect(res.reason).toBe('Expect Input Length of 6');
			expect(res.containsPass).toBe(false);
		});
		it('should fail if later descend', async () => {
			const res = await searchPasswords(CASE_FAILURE_DECREASE);
			expect(res.reason).toBe('Does not contain pass');
			expect(res.containsPass).toBe(false);
		});
		it('should fail if later descend', async () => {
			const res = await searchPasswords(CASE_FAILURE_DECREASE_DOUBLE);
			expect(res.reason).toBe('Does not contain pass');
			expect(res.containsPass).toBe(false);
		});
		it('should fail if no double', async () => {
			const res = await searchPasswords(CASE_FAILURE_NO_DOUBLE);
			expect(res.reason).toBe('Does not contain pass');
			expect(res.containsPass).toBe(false);
		});
	});
	describe('final results tests', () => {
		it('should pass double - all same digit', async () => {
			const res = await searchPasswords(CASE_SIMPLE);
			expect(res.containsPass).toBe(true);
		});
		it('should pass double - one pair', async () => {
			const res = await searchPasswords(CASE_SIMPLE_ASC);
			expect(res.containsPass).toBe(true);
		});
	});
	describe('get in range tests', () => {
		it('get passwords in range', async () => {
			const res = await passwordsInRange(111110, 111121);
			expect(res).toHaveLength(12);
			expect(res.filter(item => item.containsPass)).toHaveLength(9);
		});
	});
});

// passwordsInRange(254032, 789860).then(res => {
// 	console.log(res.filter(item => item.containsPass).length);
// 	return res;
// });
