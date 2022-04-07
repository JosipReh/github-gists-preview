import {range} from "../../src/utils/range";

describe('range', () => {
    it('should generate array from given start index to given end index', () => {
        const startIdx = 1;
        const endIdx = 10;

        const result = range(startIdx, endIdx);

        expect(result).toHaveLength(10);
        expect(result[0]).toBe(startIdx);
        expect(result[result.length -1]).toBe(endIdx);
        expect(result).toStrictEqual([1,2,3,4,5,6,7,8,9,10]);
    });
});
