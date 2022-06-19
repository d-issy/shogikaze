import Move from "./Move"
import Piece from "./Piece"
import Square from "./Square"

describe('isLegal', () => {
    describe("capture the piece that won't get token", () => {
        test.each([
            { name: 'own piece: black', move: Move.make({ piece: Piece.BPawn, from: Square.SQ55, to: Square.SQ54, captured: Piece.BGold }), expected: false },
            { name: 'own piece: white', move: Move.make({ piece: Piece.WPawn, from: Square.SQ55, to: Square.SQ56, captured: Piece.WGold }), expected: false },
        ])('$name', ({ move, expected }) => {
            expect(move.isLegal()).toBe(expected)
        })
    })
    describe("Piece that has nowhere to go", () => {
        test.each([
            { name: 'rank 1: BPawn',   move: Move.make({ piece: Piece.BPawn,   from: Square.SQ12, to: Square.SQ11 }), expected: false },
            { name: 'rank 1: BLance',  move: Move.make({ piece: Piece.BLance,  from: Square.SQ22, to: Square.SQ21 }), expected: false },
            { name: 'rank 1: BKnight', move: Move.make({ piece: Piece.BKnight, from: Square.SQ33, to: Square.SQ41 }), expected: false },
            { name: 'rank 2: BKnight', move: Move.make({ piece: Piece.BKnight, from: Square.SQ44, to: Square.SQ52 }), expected: false },
            { name: 'rank 8: WKnight', move: Move.make({ piece: Piece.WKnight, from: Square.SQ56, to: Square.SQ68 }), expected: false },
            { name: 'rank 9: WKnight', move: Move.make({ piece: Piece.WKnight, from: Square.SQ67, to: Square.SQ59 }), expected: false },
            { name: 'rank 9: WPawn',   move: Move.make({ piece: Piece.WPawn,   from: Square.SQ78, to: Square.SQ79 }), expected: false },
            { name: 'rank 9: WLance',  move: Move.make({ piece: Piece.WLance,  from: Square.SQ82, to: Square.SQ89 }), expected: false },
        ])('$name', ({ move, expected }) => {
            expect(move.isLegal()).toBe(expected)
        })
    })
})
