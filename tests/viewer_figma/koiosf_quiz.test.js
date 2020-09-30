const sum = require('../../viewer_figma/secondtest.mjs');
describe('sum', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('adds 2 + 4 to equal 6', () => {
        expect(sum(2, 4)).toBe(6);
    });
});


// const  studentBadgeName  = import('../../viewer_figma/koiosf_badges.mjs').studentBadgeName;

// describe('StudentBadgeName', () => {
//     test('if StudentBadgeName will return "Student-+currentcourse"', () => {
//         window.GlobalCourseList = {
//             GetCurrentCourse: jest.fn().mockReturnValue('string')
//                     }
//         expect(studentBadgeName).toBe('string');
//     });
// });