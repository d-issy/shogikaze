import { COLOR, Color, FILE, File, Piece, PIECE, RANK, Rank, ROLE, Role, SQUARE, Square } from "./types"
import * as utils from "./utils"

describe("toggleColor", () => {
  const tests: Array<{color: Color; want: Color}> = [
    {color: COLOR.Black, want: COLOR.White},
    {color: COLOR.White, want: COLOR.Black},
  ]
  test.each(tests)("toggleColor($color) should be $want", ({color, want}) => {
    expect(utils.toggleColor(color)).toBe(want)
  })
})

describe("togglePiece", () => {
  const tests: Array<{piece: Piece; want: Piece}> = [
    {piece: PIECE.BPawn, want: PIECE.WPawn},
    {piece: PIECE.WPawn, want: PIECE.BPawn},
    {piece: PIECE.BKing, want: PIECE.WKing},
    {piece: PIECE.WKing, want: PIECE.BKing},
    {piece: PIECE.BDragon, want: PIECE.WDragon},
    {piece: PIECE.WDragon, want: PIECE.BDragon},
  ]
  test.each(tests)("togglePiece($piece) should be $want", ({piece, want}) => {
    expect(utils.togglePiece(piece)).toBe(want)
  })
})

describe("colorOf", () => {
  const tests: Array<{piece: Piece; want: Color}> = [
    {piece: PIECE.BPawn, want: COLOR.Black},
    {piece: PIECE.WPawn, want: COLOR.White},
    {piece: PIECE.BKing, want: COLOR.Black},
    {piece: PIECE.WKing, want: COLOR.White},
    {piece: PIECE.BDragon, want: COLOR.Black},
    {piece: PIECE.WProPawn, want: COLOR.White},
  ]
  test.each(tests)("colorOf($piece) should be $want", ({piece, want}) => {
    expect(utils.colorOf(piece)).toBe(want)
  })
})

describe("roleOf", () => {
  const tests: Array<{piece: Piece; want: Role}> = [
    {piece: PIECE.BPawn, want: ROLE.Pawn},
    {piece: PIECE.WPawn, want: ROLE.Pawn},
    {piece: PIECE.BKing, want: ROLE.King},
    {piece: PIECE.WKing, want: ROLE.King},
    {piece: PIECE.BDragon, want: ROLE.Dragon},
    {piece: PIECE.WProPawn, want: ROLE.ProPawn},
  ]
  test.each(tests)("roleOf($piece) should be $want", ({piece, want}) => {
    expect(utils.roleOf(piece)).toBe(want)
  })
})

describe("promotionOf", () => {
  const tests: Array<{piece: Piece; want: boolean}> = [
    {piece: PIECE.BPawn, want: false},
    {piece: PIECE.WPawn, want: false},
    {piece: PIECE.BKing, want: false},
    {piece: PIECE.WKing, want: false},
    {piece: PIECE.BDragon, want: true},
    {piece: PIECE.WProPawn, want: true},
  ]
  test.each(tests)("promotionOf($piece) should be $want", ({piece, want}) => {
    expect(utils.promotionOf(piece)).toBe(want)
  })
})

describe("toPos", () => {
  const tests: Array<{ square: Square; want: [File, Rank] }> = [
    { square: SQUARE.SQ_11, want: [FILE.F1, RANK.R1] },
    { square: SQUARE.SQ_23, want: [FILE.F2, RANK.R3] },
    { square: SQUARE.SQ_47, want: [FILE.F4, RANK.R7] },
  ]
  test.each(tests)("toPos($square) should be $want", ({square, want}) => {
    expect(utils.toPos(square)).toEqual(want)
  })
})

describe("toSquare", () => {
  const tests: Array<{ file: File; rank: Rank; want: Square }> = [
    { file: FILE.F1, rank: RANK.R1, want: SQUARE.SQ_11 },
    { file: FILE.F2, rank: RANK.R3, want: SQUARE.SQ_23 },
    { file: FILE.F4, rank: RANK.R7, want: SQUARE.SQ_47 },
  ]
  test.each(tests)("toSquare($square) should be $want", ({ file, rank, want }) => {
    expect(utils.toSquare(file, rank)).toEqual(want)
  })
})

describe("toFile", () => {
  const tests: Array<{square: Square; want: File}> = [
    {square: SQUARE.SQ_11, want: FILE.F1},
    {square: SQUARE.SQ_23, want: FILE.F2},
    {square: SQUARE.SQ_47, want: FILE.F4},
  ]
  test.each(tests)("toFile($square) should be $want", ({square, want}) => {
    expect(utils.toFile(square)).toBe(want)
  })
})

describe("toRank", () => {
  const tests: Array<{square: Square; want: Rank}> = [
    {square: SQUARE.SQ_11, want: RANK.R1},
    {square: SQUARE.SQ_23, want: RANK.R3},
    {square: SQUARE.SQ_47, want: RANK.R7},
  ]
  test.each(tests)("toRank($square) should be $want", ({square, want}) => {
    expect(utils.toRank(square)).toBe(want)
  })
})

describe("filpFile", () => {
  const tests: Array<{square: Square; want: Square}> = [
    {square: SQUARE.SQ_11, want: SQUARE.SQ_91},
    {square: SQUARE.SQ_23, want: SQUARE.SQ_83},
    {square: SQUARE.SQ_47, want: SQUARE.SQ_67},
  ]
  test.each(tests)("flipFile($square) should be $want", ({square, want}) => {
    expect(utils.flipFile(square)).toBe(want)
  })
})

describe("filpRank", () => {
  const tests: Array<{square: Square; want: Square}> = [
    {square: SQUARE.SQ_11, want: SQUARE.SQ_19},
    {square: SQUARE.SQ_23, want: SQUARE.SQ_27},
    {square: SQUARE.SQ_47, want: SQUARE.SQ_43},
  ]
  test.each(tests)("flipRank($square) should be $want", ({square, want}) => {
    expect(utils.flipRank(square)).toBe(want)
  })
})
