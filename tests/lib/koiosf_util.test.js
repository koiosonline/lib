/**
 * @jest-environment jsdom
 */

import { getElement } from '../../lib/koiosf_util.mjs';
import { getElementVal } from '../../lib/koiosf_util.mjs';
import '@testing-library/jest-dom'

// https://stackoverflow.com/questions/47902335/innertext-is-undefined-in-jest-test
// https://github.com/jsdom/jsdom/issues/1245
Object.defineProperty(global.Element.prototype, 'innerText', {
    get() {
        return this.textContent;
    },
});

// describe('getElement', () => {
//     it('should getElement', () => {
//         document.body.innerHTML = `
//         <div id="id0" class="header">
//             <p id="id1" class="first-paragraph">this is the first paragraph</p>
//             <p id="id2" class="paragraph second-paragraph">this is the second paragraph</p>
//             <p id="id3" class="paragraph third-paragraph">this is the third paragraph</p>
//             <p id="id4" class="fourth-paragraph">this is the fourth paragraph</p>
//         </div>
//         <div id="id5" class="footer">
//             <p id="id6" class="first-paragraph">this is the first paragraph</p>
//             <p id="id7" class="paragraph second-paragraph">this is the second paragraph of footer</p>
//             <p id="id8" class="paragraph third-paragraph">this is the third paragraph</p>
//             <p id="id9" class="fourth-paragraph">this is the fourth paragraph</p>
//         </div>`;

//         expect(getElement('paragraph', 'footer')).toContainHTML('<p class="paragraph second-paragraph" id="id7">this is the second paragraph footer</p>');
//     });

// });

describe('getElementVal', () => {
    it('should return undefined if no parameters are given', () => {
        expect(getElementVal()).toBeUndefined();
    });

    it('should return undefined if parameter can not be found', () => {
        expect(getElementVal('random-name-that-does-not-exist')).toBeUndefined();
    });


    it('should return the content of paragraph with id "firstName" without any spaces / trimmed', () => {

        document.body.innerHTML = `
        <div id="content">
        <p id="firstName" class="name">    name   </p>
        <p id="domid" class="domid">domid domid domid</p>
        <p id="domid2" class="domid2">domid2 domid2 domid2</p>
        </div>`;

        expect(getElementVal('firstName')).toBe('name');
    });

    it('should return the content of paragraph with class "firstName" without any spaces / trimmed', () => {

        document.body.innerHTML = `
        <div id="content">
        <p class="firstName">    name   </p>
        <p class="domid">domid domid domid</p>
        <p class="domid2">domid2 domid2 domid2</p>
        </div>`;

        expect(getElementVal('firstName')).toBe('name');
    });

    // it('should', () => {
    //     var domid2="manmee  "
    //     document.body.innerHTML = `
    //     <div id="content">
    //     <p id="id1" class="firstName">    name   </p>
    //     <p id="id2" class="class firstParagraph">this is the first paragraph        </p>
    //     <p id="id3" class="class secondParagraph">this is the second paragraph        </p>
    //     <p id="id4" class="domid2">domid2 domid2 domid2</p>
    //     </div>`;

    //     expect(getElementVal('class', 'secondParagraph')).toBe('');
    // });
});
