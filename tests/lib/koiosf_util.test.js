
import { getElement } from '../../lib/koiosf_util.mjs';
import { getElementVal } from '../../lib/koiosf_util.mjs';

// https://stackoverflow.com/questions/47902335/innertext-is-undefined-in-jest-test
// https://github.com/jsdom/jsdom/issues/1245
Object.defineProperty(global.Element.prototype, 'innerText', {
    get() {
        return this.textContent;
    },
});

const mockBody = `
<div id="id0" class="header">
    <p id="id1" class="first-paragraph">this is the first paragraph</p>
    <p id="id2" class="paragraph second-paragraph">this is the second paragraph</p>
    <p id="id3" class="paragraph third-paragraph">this is the third paragraph</p>
    <p id="id4" class="fourth-paragraph">this is the fourth paragraph</p>
</div>
<div id="id5" class="footer">
    <p id="id6" class="first-paragraph">this is the first paragraph</p>
    <p id="id7" class="paragraph second-paragraph">this is the second paragraph of footer</p>
    <p id="id8" class="paragraph third-paragraph">this is the third paragraph</p>
    <p id="id9" class="fourth-paragraph">this is the fourth paragraph</p>
</div>`;


const mockContent = `
<div id="content">
    <p class="firstName">    name   </p>
    <p class="lastName">last name</p>
</div>`;


describe('getElement', () => {
    it('should getElement', () => {
        const expectedOutput = '<p id="id7" class="paragraph second-paragraph">this is the second paragraph of footer</p>';
        document.body.innerHTML = mockBody;

        expect(getElement('second-paragraph', 'footer').outerHTML).toBe(expectedOutput);
    });
});

describe('getElementVal', () => {
    it('should return undefined if no parameters are given', () => {
        expect(getElementVal()).toBeUndefined();
    });

    it('should return undefined if parameter can not be found', () => {
        expect(getElementVal('random-name-that-does-not-exist')).toBeUndefined();
    });

    it('should return the content of paragraph with id "firstName" without any spaces / trimmed', () => {
        document.body.innerHTML = mockContent;
        expect(getElementVal('firstName')).toBe('name');
    });

    it('should return the content of paragraph with class "firstName" without any spaces / trimmed', () => {
        document.body.innerHTML = mockContent;
        expect(getElementVal('firstName')).toBe('name');
    });

    it('should not return the content of paragraph with class "firstName" with all the spaces', () => {
        document.body.innerHTML = mockContent;
        expect(getElementVal('firstName')).not.toBe('    name   ');
    });

    it('should return the content of the first paragraph with class "firstname" and contain "test"', () => {
        document.body.innerHTML = mockContent;
        expect(getElementVal('lastName')).toContain('last');
    });
});
