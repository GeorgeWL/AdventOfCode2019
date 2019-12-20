class Orbitals {
	constructor() {
		this.objects = new Set();
	}
	parseCurrentObject(object) {
		const parsed = object.split(')');
		const newObject = this.objects;
		const id = parsed[0];
		newObject[id] =
			newObject && newObject[id] && newObject[id].length > 0
				? newObject[id]
				: [];
		this.objects = newObject;
	}
	parseObjects(objectArr) {
		objectArr.forEach(element => {
			this.parseCurrentObject(element);
		});
	}
}
const CASE_COM = [
	'COM)B',
	'B)C',
	'C)D',
	'D)E',
	'E)F',
	'B)G',
	'G)H',
	'D)I',
	'E)J',
	'J)K',
	'K)L'
];
const res = [
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	},
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	},
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	},
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	},
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	},
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	},
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	},
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	},
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	},
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	},
	{
		COM: ['B'],
		B: ['C', 'G'],
		C: ['D'],
		D: ['E', 'I'],
		E: ['F', 'J'],
		G: ['H'],
		J: ['K'],
		K: ['L']
	}
];
let orbitals;
describe('parseCurrentObject', () => {
	beforeEach(() => {
		orbitals = new Orbitals();
	});
	it('case_com[0] 1 orbital', () => {
		orbitals.parseCurrentObject(CASE_COM[0]);
		expect(orbitals.currentObject).toEqual({ COM: ['B'] });
	});
	it('case_com[0] 1 orbital', () => {
		orbitals.parseObjects(CASE_COM);
		console.log(orbitals.objects.length);

		expect(orbitals.objects[0]).toEqual({ COM: ['B'] });
	});
});
