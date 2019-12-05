// console.log('Hello Advent');

/*
 * 6 Digit Number
 * Is contained within input
 * Two digits adjacent digits (e.g. `22` in 1`22`345)
 * Only ever Increase or stay the same
 */

const CASE_SIMPLE = 111111;
const CASE_SIMPLE_ASC = 112345;
const CASE_FAILURE_DECREASE = 123450;
const CASE_FAILURE_DECREASE_DOUBLE = 223450;
const CASE_FAILURE_NO_DOUBLE = 123456;
const CASE_FAILURE_LENGTH = 12345;

function passwordMeetsCriteria(input) {
	input = input.toString();
	if (input.length !== 6) {
		return false;
	} else {
		return findDupesInPassword(input) && checkNotDescending(input);
	}
}

function findDupesInPassword(input) {
	input = input.toString();
	const chunks = [
		[input[0], input[1]],
		[input[2], input[3]],
		[input[4], input[5]]
	];
	return chunks
		.map(chunk => {
			return checkMatchPair(chunk[0], chunk[1]);
		})
		.some(res => res === true);
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

function passwordsInRange(start, end) {
	const passArray = Array(end - start + 1)
		.fill()
		.map((_, index) => start + index)
		.fill(start, end);
	const validPasswords = [];
	passArray.forEach(pass => {
		if (passwordMeetsCriteria(pass)) {
			validPasswords.push(pass);
		}
	});
	console.log({
		validPasses: validPasswords.length,
		passwordsChecked: passArray.length
	});

	return validPasswords;
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
			const res = checkNotDescending(CASE_FAILURE_LENGTH);
			expect(res).toBe(true);
		});
		it('should return true not descending - CASE_SIMPLE_ASC', () => {
			const res = checkNotDescending(CASE_FAILURE_NO_DOUBLE);
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
		it('should fail if length !==6', () => {
			const res = passwordMeetsCriteria(CASE_FAILURE_LENGTH);
			expect(res).toBe(false);
		});
		it('should fail if later descend - no double', () => {
			const res = passwordMeetsCriteria(CASE_FAILURE_DECREASE);
			expect(res).toEqual(false);
		});
		it('should fail if later descend - has double', () => {
			const res = passwordMeetsCriteria(CASE_FAILURE_DECREASE_DOUBLE);
			expect(res).toEqual(false);
		});
		it('should fail if no double', () => {
			const res = passwordMeetsCriteria(CASE_FAILURE_NO_DOUBLE);
			expect(res).toEqual(false);
		});
	});

	describe('find dupes', () => {
		it('should pass double - all same digit', () => {
			const res = findDupesInPassword(CASE_SIMPLE);
			expect(res).toBe(true);
		});
		it('should pass double - one pair', () => {
			const res = findDupesInPassword(CASE_SIMPLE_ASC);
			expect(res).toBe(true);
		});
	});

	describe('get in range tests', () => {
		it('get passwords in range', () => {
			const res = passwordsInRange(111110, 111121);
			expect(res).toHaveLength(9);
		});
		it('get passwords in range', () => {
			const res = passwordsInRange(254032, 789860);
			expect(res).toHaveLength(936);
		});
	});
});
