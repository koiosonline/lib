// initialize test
// mockup js modudules
// util module , lib
// entire app, in webbrowser. web responses, like mouseclicks

const  ShowButton  = import('../../lib/koiosf_util.mjs').ShowButton;

describe('ShowButton', () => {
    test('', () => {
        expect(ShowButton()).toBe('string');
    });
});