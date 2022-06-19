import Move from "../../entity/Move"
import Piece from "../../entity/Piece"
import Square from "../../entity/Square"
import UsiMove from "./UsiMove"

describe('FromMove', ()=>{
    test.each([
        { move: Move.make({ piece: Piece.BPawn, from: Square.SQ77, to: Square.SQ76 }), value: "7g7f" },
        { move: Move.make({ piece: Piece.WGold, to: Square.SQ52, dropped: true }), value: "G*5b" },
        { move: Move.make({ piece: Piece.BBishop, from: Square.SQ88, to: Square.SQ22, promoted: true }), value: "8h2b+" },
    ])('$value', ({move, value}) => {
        expect(UsiMove.FromMove(move)).toBe(value)
    })
})

describe('FromMoves', ()=>{
    it('expected 7g7f 3c3d 2g2f', () => {
        const moves: Move[] = [
            Move.make({ piece: Piece.BPawn, from: Square.SQ77, to: Square.SQ76 }),
            Move.make({ piece: Piece.WPawn, from: Square.SQ33, to: Square.SQ34 }),
            Move.make({ piece: Piece.BPawn, from: Square.SQ27, to: Square.SQ26 }),
        ]
        expect(UsiMove.FromMoves(moves)).toBe("7g7f 3c3d 2g2f")
    })
})
