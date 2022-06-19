import Board from "./Board";
import Piece from "./Piece";
import Square from "./Square";

test('get & put', () => {
    const board = Board.empty()

    expect(board.get(Square.SQ55)).toEqual(Piece.EMPTY)

    board.put(Square.SQ55, Piece.PPawn)
    expect(board.get(Square.SQ55)).toEqual(Piece.PPawn)
})
