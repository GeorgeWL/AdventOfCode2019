// console.log('Hello Advent');

/*
 * 6 Digit Number
 * Is contained within input
 * Two digits adjacent digits (e.g. `22` in 1`22`345)
 * Only ever Increase or stay the same
 */

const CASE_PASS_SIMPLE = 111111;
const CASE_PASS_ASC = 112345;
const CASE_PASS_ASC_START = 122345;
const CASE_FAILURE_DECREASE = 123450;
const CASE_FAILURE_DECREASE_DOUBLE = 223450;
const CASE_FAILURE_NO_DOUBLE = 123456;
const CASE_FAILURE_LENGTH = 12345;

const CASE_PASS_TRIPLEPAIR = 112233;
const CASE_PASS_DOUBLE_END = 111122;
const CASE_FAILURE_TRIPLE = 123444;

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
		[input[1], input[2]],
		[input[2], input[3]],
		[input[3], input[4]],
		[input[4], input[5]]
	];
	return chunks
		.map(chunk => {
			return checkMatchPair(chunk[0], chunk[1]);
		})
		.some(res => res === true);
}

function findDupesInPasswordNew(input) {
	input = input.toString();
	const chunks = [
		[input[0], input[1]],
		[input[1], input[2]],
		[input[2], input[3]],
		[input[3], input[4]],
		[input[4], input[5]]
	];
	const res = chunks.map(chunk => {
		return checkMatchPair(chunk[0], chunk[1]);
	});
	console.log({ res });

	if (!res.every(pair => pair === true)) {
		return res.some(pairs => pairs === true);
	} else {
		return false;
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

function passwordsInRange(start, end) {
	const passArray = [...new Array(end - start).keys()].map(key => key + start);
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

describe('part 1 tests', () => {
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
			const res = checkNotDescending(CASE_PASS_SIMPLE);
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
			const res = checkNotDescending(CASE_PASS_ASC);
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
			const res = findDupesInPassword(CASE_PASS_SIMPLE);
			expect(res).toBe(true);
		});
		it('should pass double - one pair', () => {
			const res = findDupesInPassword(CASE_PASS_ASC);
			expect(res).toBe(true);
		});
		it('should pass double - one pair', () => {
			const res = findDupesInPassword(CASE_PASS_ASC_START);
			expect(res).toBe(true);
		});
	});

	describe('get in range tests', () => {
		it('get passwords in range', () => {
			const res = passwordsInRange(254032, 789860);
			console.log(res.length);
			expect(res).toHaveLength(1033);
		});
	});
});
describe('part 2 tests', () => {
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
			const res = checkNotDescending(CASE_PASS_SIMPLE);
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
			const res = checkNotDescending(CASE_PASS_ASC);
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
		it('should fail if triple', () => {
			const res = passwordMeetsCriteria(CASE_FAILURE_NO_DOUBLE);
			expect(res).toEqual(false);
		});
	});

	describe.only('find dupes', () => {
		it('should pass double - one pair', () => {
			const res = findDupesInPasswordNew(CASE_PASS_ASC);
			expect(res).toBe(true);
		});
		it('should pass double - triple pair', () => {
			const res = findDupesInPasswordNew(CASE_PASS_TRIPLEPAIR);
			expect(res).toBe(true);
		});
		it('should pass double - one pair at end', () => {
			const res = findDupesInPassword(CASE_PASS_TRIPLEPAIR);
			expect(res).toBe(true);
		});
		it('should fail double - all same digit', () => {
			const res = findDupesInPasswordNew(CASE_PASS_SIMPLE);
			expect(res).toBe(false);
		});
		it.only('should fail double - triple only', () => {
			const res = findDupesInPasswordNew(CASE_FAILURE_TRIPLE);
			expect(res).toBe(false);
		});
	});

	describe('get in range tests', () => {
		it('get passwords in range', () => {
			const res = passwordsInRange(254032, 789860);
			console.log(res.length);
			expect(res).toHaveLength(1033);
		});
	});
});
