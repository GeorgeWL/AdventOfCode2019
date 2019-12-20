const operand_add = 1;
const operand_mutliply = 2;
const operand_stop = 99;
const case_1 = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]; //
const res_case_1 = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
const case_2 = [1, 0, 0, 0, 99];
const res_case_2 = [2, 0, 0, 0, 99];
const case_3 = [2, 3, 0, 3, 99];
const res_case_3 = [2, 3, 0, 6, 99];
const case_4 = [2, 4, 4, 5, 99, 0];
const res_case_4 = [2, 4, 4, 5, 99, 9801];
const case_5 = [1, 1, 1, 4, 99, 5, 6, 0, 99];
const res_case_5 = [30, 1, 1, 4, 2, 5, 6, 0, 99];

const puzzle_input = [
	1,
	12,
	2,
	3,
	1,
	1,
	2,
	3,
	1,
	3,
	4,
	3,
	1,
	5,
	0,
	3,
	2,
	1,
	10,
	19,
	1,
	6,
	19,
	23,
	2,
	23,
	6,
	27,
	2,
	6,
	27,
	31,
	2,
	13,
	31,
	35,
	1,
	10,
	35,
	39,
	2,
	39,
	13,
	43,
	1,
	43,
	13,
	47,
	1,
	6,
	47,
	51,
	1,
	10,
	51,
	55,
	2,
	55,
	6,
	59,
	1,
	5,
	59,
	63,
	2,
	9,
	63,
	67,
	1,
	6,
	67,
	71,
	2,
	9,
	71,
	75,
	1,
	6,
	75,
	79,
	2,
	79,
	13,
	83,
	1,
	83,
	10,
	87,
	1,
	13,
	87,
	91,
	1,
	91,
	10,
	95,
	2,
	9,
	95,
	99,
	1,
	5,
	99,
	103,
	2,
	10,
	103,
	107,
	1,
	107,
	2,
	111,
	1,
	111,
	5,
	0,
	99,
	2,
	14,
	0,
	0
];

function opCodeMap(opArray) {
	const opMap = new Map();
	opArray.forEach((value, index) => {
		opMap.set(index, value);
	});
	return opMap;
}

function operate(operand, noun, verb) {
	if (operand === 'add') {
		return noun + verb;
	}
	if (operand === 'multiply') {
		return noun * verb;
	}
}
function bruteForceFindParams(output) {
	return new Promise((resolve, reject) => {
		let res = 0;
		let noun = 1;
		let verb = 1;
		for (let indexX = 1; indexX <= 99; indexX++) {
			noun = indexX;
			res = operate('multiply', noun, verb);
			if (res === output) {
				console.log({ noun, verb });
				resolve({ noun, verb });
			}
		}
		for (let indexY = 1; indexY <= 99; indexY++) {
			verb = indexY;
			res = operate('multiply', noun, verb);
			if (res === output) {
				console.log({ noun, verb });
				resolve({ noun, verb });
			}
		}
		if (res === output) {
			console.log({ noun, verb });
			resolve({ noun, verb });
		}
		if (noun >= 100 || verb >= 100) {
			reject(`expect noun: ${noun} and/or verb: ${verb} to be <=99`);
		}
	});
}

function mathOpCodes(opMap) {
	let operand;
	let inputPosX;
	let inputPosY;
	let outputPos;
	let currentOpIndex = 0;
	opMap.forEach((_, index) => {
		// read opcodes map to find operand.
		// set operand
		operand = parseOperand(opMap.get(currentOpIndex));
		inputPosX = opMap.get(currentOpIndex + 1);
		inputPosY = opMap.get(currentOpIndex + 2);
		outputPos = opMap.get(currentOpIndex + 3);
		if (operand === 'stop') {
			// if stop opcode, terminate opcode program
			currentOpIndex += opMap.length + 1;
		} else {
			// set value;
			opMap.set(outputPos, operate(operand, inputPosX, inputPosY));
			// skip 4 after set
			currentOpIndex += 4;
		}

		return opMap.get(index);
	});
	return [...opMap.values()];
}

function parseOperand(opcode) {
	switch (opcode) {
		case 1:
			return 'add';
			break;
		case 2:
			return 'multiply';
			break;
		case 99:
			return 'stop';
			break;
		default:
			console.error(`${opcode} is not a opcode`);
			return '';
			break;
	}
}

describe('OpMap', () => {
	it('returns expected map', () => {
		const map = new Map([
			[0, 1],
			[1, 9],
			[2, 10],
			[3, 3],
			[4, 2],
			[5, 3],
			[6, 11],
			[7, 0],
			[8, 99],
			[9, 30],
			[10, 40],
			[11, 50]
		]);
		expect(opCodeMap(case_1)).toEqual(map);
	});
	it('should parse intcodes', () => {
		expect(parseOperand(1)).toBe('add');
		expect(parseOperand(2)).toBe('multiply');
		expect(parseOperand(Math.max(3, Math.floor(Math.random() * 10 + 2)))).toBe(
			''
		);
	});
	it('should mathOpCodes', () => {
		expect(mathOpCodes(opCodeMap(case_1))).toEqual(res_case_1);
		expect(mathOpCodes(opCodeMap(case_2))).toEqual(res_case_2);
		expect(mathOpCodes(opCodeMap(case_3))).toEqual(res_case_3);
		expect(mathOpCodes(opCodeMap(case_4))).toEqual(res_case_4);
		expect(mathOpCodes(opCodeMap(case_5))).toEqual(res_case_5);
	});
	it('should getPuzzleOutput', () => {
		expect(mathOpCodes(opCodeMap(puzzle_input))[0]).toEqual(5434663);
	});
	jest.setTimeout(2000000000);
	it.only('should getPuzzleOutput 2', async () => {
		bruteForceFindParams(19690720).then(res => {
			expect(res).toEqual({ noun: 1, verb: 1 });
		});
	});
});
