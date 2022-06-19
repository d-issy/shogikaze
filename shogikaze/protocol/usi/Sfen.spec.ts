import Board from "../../entity/Board"
import Color from "../../entity/Color"
import Piece from "../../entity/Piece"
import Square from "../../entity/Square"
import Sfen from "./Sfen"

describe('fromBoard', () => {
    test('', () => {
        const board = Board.empty()
        board.turn = Color.WHITE
        board.put(Square.SQ11, Piece.BPawn)
        board.put(Square.SQ12, Piece.BKing)
        board.put(Square.SQ23, Piece.WKing)
        board.put(Square.SQ34, Piece.WDragon)
        board.hands.push(Piece.BPawn, 13)
        expect(Sfen.fromBoard(board)).toEqual(new Sfen("sfen 8P/8K/7k1/6r+2/9/9/9/9/9 w 13P 1"))
    })
})

describe('toBoard', () => {
    test('平手', () => {
        const sfen = Sfen.hirate()
        const board = sfen.toBoard()
        expect(board.get(Square.SQ11)).toEqual(Piece.WLance)
        expect(board.get(Square.SQ22)).toEqual(Piece.WBishop)
        expect(board.get(Square.SQ82)).toEqual(Piece.WRook)
        expect(board.get(Square.SQ28)).toEqual(Piece.BRook)
        expect(board.get(Square.SQ88)).toEqual(Piece.BBishop)
    })
    test('成駒', () => {
        const sfen = new Sfen("sfen 9/9/9/9/4R+4/9/9/9/9 b - 1")
        const board = sfen.toBoard()
        expect(board.get(Square.SQ55)).toEqual(Piece.BDragon)
    })
    test('手番', () => {
        expect(new Sfen("sfen 9/9/9/9/9/9/9/9/9 b - 1").toBoard().turn).toEqual(Color.BLACK)
        expect(new Sfen("sfen 9/9/9/9/9/9/9/9/9 w - 1").toBoard().turn).toEqual(Color.WHITE)
    })
    test('持ち駒', () => {
        expect(new Sfen("sfen 9/9/9/9/9/9/9/9/9 b - 1").toBoard().hands.count(Piece.BPawn)).toBe(0)
        expect(new Sfen("sfen 9/9/9/9/9/9/9/9/9 b P 1").toBoard().hands.count(Piece.BPawn)).toBe(1)
        expect(new Sfen("sfen 9/9/9/9/9/9/9/9/9 b 2P 1").toBoard().hands.count(Piece.BPawn)).toBe(2)
        expect(new Sfen("sfen 9/9/9/9/9/9/9/9/9 b 10P 1").toBoard().hands.count(Piece.BPawn)).toBe(10)
        expect(new Sfen("sfen 9/9/9/9/9/9/9/9/9 b r 1").toBoard().hands.count(Piece.WRook)).toBe(1)
    })
})
