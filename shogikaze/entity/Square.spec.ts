import sq from './Square'

describe('file()', () => {
    test.each([
        { name: "SQ11", square: sq.SQ11, expected: 1 },
        { name: "SQ19", square: sq.SQ19, expected: 1 },
        { name: "SQ21", square: sq.SQ21, expected: 2 },
        { name: "SQ99", square: sq.SQ99, expected: 9 },
    ])('test:$name', ({ square, expected }) => {
        expect(square.file() + 1).toBe(expected)
    })
})

describe('rank()', () => {
    test.each([
        { name: "SQ11", square: sq.SQ11, expected: 1 },
        { name: "SQ19", square: sq.SQ19, expected: 9 },
        { name: "SQ35", square: sq.SQ35, expected: 5 },
        { name: "SQ99", square: sq.SQ99, expected: 9 },
    ])('test:$name', ({ square, expected }) => {
        expect(square.rank() + 1).toBe(expected)
    })
})
