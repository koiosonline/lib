import { sum } from '../../viewer_figma/sum.mjs';
import { mus } from '../../viewer_figma/sum.mjs';


describe('sum', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('adds 2 + 4 to equal 6', () => {
        expect(sum(2, 4)).toBe(6);
    });

    test('adds 1 + 2 to equal 3', () => {
        expect(mus(1, 2)).toBe(3);
    });
});
