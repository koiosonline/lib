//https://medium.com/piecesofcode/testing-javascript-code-with-jest-18a398888838#:~:text=Jest%20can%20be%20used%20to,(s)%20with%20the%20a%20.&text=js%20or%20.




const sum = require('../../viewer_figma/secondtest.mjs');
describe('sum', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('adds 2 + 4 to equal 6', () => {
        expect(sum(2, 4)).toBe(6);
    });
});

// const { QuizLeft } = require('../../viewer_figma/koiosf_quiz.mjs');
// describe('QuizLeft', () => {
//     test('console.log the text "QuizLeft', () => {
//         expect(QuizLeft.QuizLeft).toBe(3);
//     });
// });

// const  studentBadgeName  = import('../../viewer_figma/koiosf_badges.mjs').studentBadgeName;

// describe('StudentBadgeName', () => {
//     test('if StudentBadgeName will return "Student-+currentcourse"', () => {
//         window.GlobalCourseList = {
//             studentBadgeName: jest.fn(() => 'GetCurrentCourse()')
//         }
//         expect(studentBadgeName).toBe('string');
//     });
// });

const  studentBadgeName  = import('../../viewer_figma/koiosf_badges.mjs').studentBadgeName;

describe('StudentBadgeName', () => {
    test('if StudentBadgeName will return "Student-+currentcourse"', () => {
        window.GlobalCourseList = {
            GetCurrentCourse: jest.fn().mockReturnValue('string')
                    }
        expect(studentBadgeName).toBe('string');
    });
});