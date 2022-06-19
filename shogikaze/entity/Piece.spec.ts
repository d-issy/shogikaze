import c from './Color'
import p from './Piece'

describe('isEmpty', () => {
    test.each([
        { name: 'Empty', piece: p.EMPTY, expected: true  },
        { name: 'BKing', piece: p.BKing, expected: false },
    ])("test:$name", ({ piece, expected }) => {
        expect(piece.isEmpty()).toBe(expected)
    })
})

describe('isBlack', () => {
    test.each([
        { name: 'BSilver', piece: p.BSilver, expected: true  },
        { name: 'BKing'  , piece: p.BKing,   expected: true  },
        { name: 'WSilver', piece: p.WSilver, expected: false },
        { name: 'WPawn'  , piece: p.WPawn,   expected: false },
    ])("test:$name", ({ piece, expected }) => {
        expect(piece.isBlack()).toBe(expected)
    })
})

describe('isWhite', () => {
    test.each([
        { name: 'WSilver', piece: p.WSilver, expected: true  },
        { name: 'WKing'  , piece: p.WKing,   expected: true  },
        { name: 'BSilver', piece: p.BSilver, expected: false },
        { name: 'BKing'  , piece: p.BKing,   expected: false },
    ])("test:$name", ({ piece, expected }) => {
        expect(piece.isWhite()).toBe(expected)
    })
})

describe('isPromoted', () => {
    test.each([
        { name: 'BBishop', piece: p.BBishop, expected: false },
        { name: 'BKing'  , piece: p.BKing,   expected: false },
        { name: 'BPPawn' , piece: p.BPPawn,  expected: true  },
        { name: 'BDragon', piece: p.BDragon, expected: true  },
        { name: 'WBishop', piece: p.WBishop, expected: false },
        { name: 'WKing'  , piece: p.WKing,   expected: false },
        { name: 'WPPawn' , piece: p.WPPawn,  expected: true  },
        { name: 'WDragon', piece: p.WDragon, expected: true  },
    ])("test:$name", ({ piece, expected }) => {
        expect(piece.isPromoted()).toBe(expected)
    })
})

describe('canPromote', () => {
    test.each([
        { name: 'BPawn'  , piece: p.BPawn,   expected: true  },
        { name: 'BSilver', piece: p.BSilver, expected: true  },
        { name: 'BRook'  , piece: p.BRook,   expected: true  },
        { name: 'BGold'  , piece: p.BGold,   expected: false },
        { name: 'BKing'  , piece: p.BKing,   expected: false },
        { name: 'BDragon', piece: p.BDragon, expected: false },
        { name: 'WPawn'  , piece: p.WPawn,   expected: true  },
        { name: 'WSilver', piece: p.WSilver, expected: true  },
        { name: 'WRook'  , piece: p.WRook,   expected: true  },
        { name: 'WGold'  , piece: p.WGold,   expected: false },
        { name: 'WKing'  , piece: p.WKing,   expected: false },
        { name: 'WDragon', piece: p.WDragon, expected: false },
    ])("test:$name", ({ piece, expected }) => {
        expect(piece.canPromoted()).toBe(expected)
    })
})

describe('pieceType', () => {
    test.each([
        { name: 'BPawn'  , piece: p.BPawn, expected: p.Pawn },
        { name: 'BKing' ,  piece: p.BKing, expected: p.King },
        { name: 'BDragon', piece: p.BDragon, expected: p.Dragon },
    ])("test:$name", ({ piece, expected }) => {
        expect(piece.pieceType()).toEqual(expected)
    })
})

describe('color', () => {
    test.each([
        { name: 'BPawn'  , piece: p.BPawn,   expected: c.BLACK },
        { name: 'BDragon', piece: p.BDragon, expected: c.BLACK },
        { name: 'WPawn'  , piece: p.WPawn,   expected: c.WHITE },
        { name: 'WDragon', piece: p.WDragon, expected: c.WHITE },
    ])("test:$name", ({ piece, expected }) => {
        expect(piece.color()).toBe(expected)
    })
})

describe('promote', () => {
    test.each([
        { name: 'BPawn'  , piece: p.BPawn,   expected: p.BPPawn   },
        { name: 'BBishop', piece: p.BBishop, expected: p.BHorse   },
        { name: 'WKnight', piece: p.WKnight, expected: p.WPKnight },
        { name: 'WRook'  , piece: p.WRook,   expected: p.WDragon  },
    ])("test:$name", ({ piece, expected }) => {
        expect(piece.promote()).toEqual(expected)
    })
})

describe('unPromote', () => {
    test.each([
        { name: 'BPPawn',   piece: p.BPPawn,   expected: p.BPawn },
        { name: 'BHorse',   piece: p.BHorse,   expected: p.BBishop  },
        { name: 'WPKnight', piece: p.WPKnight, expected: p.WKnight  },
        { name: 'WDragon',  piece: p.WDragon,  expected: p.WRook    },
    ])("test:$name", ({ piece, expected }) => {
        expect(piece.unPromote()).toEqual(expected)
    })
})

describe('opponent', () => {
    test.each([
        { name: 'BPawn'  , piece: p.BPawn,   expected: p.WPawn },
        { name: 'BDragon', piece: p.BDragon, expected: p.WDragon },
        { name: 'WPawn'  , piece: p.WPawn,   expected: p.BPawn },
        { name: 'WDragon', piece: p.WDragon, expected: p.BDragon },
    ])("test:$name", ({ piece, expected }) => {
        expect(piece.opponent()).toEqual(expected)
    })
})
