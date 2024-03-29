import { COLOR, Color, FILE, File, Hand, Move, Piece, PIECE, RANK, Rank, ROLE, Role, SQUARE, Square } from "./types"
import * as utils from "./utils"

describe("toggleColor", () => {
  const tests: Array<{ color: Color; want: Color }> = [
    { color: COLOR.Black, want: COLOR.White },
    { color: COLOR.White, want: COLOR.Black },
  ]
  test.each(tests)("toggleColor($color) should be $want", ({ color, want }) => {
    expect(utils.toggleColor(color)).toBe(want)
  })
})

describe("togglePiece", () => {
  const tests: Array<{ piece: Piece; want: Piece }> = [
    { piece: PIECE.BPawn, want: PIECE.WPawn },
    { piece: PIECE.WPawn, want: PIECE.BPawn },
    { piece: PIECE.BKing, want: PIECE.WKing },
    { piece: PIECE.WKing, want: PIECE.BKing },
    { piece: PIECE.BDragon, want: PIECE.WDragon },
    { piece: PIECE.WDragon, want: PIECE.BDragon },
  ]
  test.each(tests)("togglePiece($piece) should be $want", ({ piece, want }) => {
    expect(utils.togglePiece(piece)).toBe(want)
  })
})

describe("colorOf", () => {
  const tests: Array<{ piece: Piece; want: Color }> = [
    { piece: PIECE.BPawn, want: COLOR.Black },
    { piece: PIECE.WPawn, want: COLOR.White },
    { piece: PIECE.BKing, want: COLOR.Black },
    { piece: PIECE.WKing, want: COLOR.White },
    { piece: PIECE.BDragon, want: COLOR.Black },
    { piece: PIECE.WProPawn, want: COLOR.White },
  ]
  test.each(tests)("colorOf($piece) should be $want", ({ piece, want }) => {
    expect(utils.colorOf(piece)).toBe(want)
  })
})

describe("roleOf", () => {
  const tests: Array<{ piece: Piece; want: Role }> = [
    { piece: PIECE.BPawn, want: ROLE.Pawn },
    { piece: PIECE.WPawn, want: ROLE.Pawn },
    { piece: PIECE.BKing, want: ROLE.King },
    { piece: PIECE.WKing, want: ROLE.King },
    { piece: PIECE.BDragon, want: ROLE.Dragon },
    { piece: PIECE.WProPawn, want: ROLE.ProPawn },
  ]
  test.each(tests)("roleOf($piece) should be $want", ({ piece, want }) => {
    expect(utils.roleOf(piece)).toBe(want)
  })
})

describe("promotionOf", () => {
  const tests: Array<{ piece: Piece; want: boolean }> = [
    { piece: PIECE.BPawn, want: false },
    { piece: PIECE.WPawn, want: false },
    { piece: PIECE.BKing, want: false },
    { piece: PIECE.WKing, want: false },
    { piece: PIECE.BDragon, want: true },
    { piece: PIECE.WProPawn, want: true },
  ]
  test.each(tests)("promotionOf($piece) should be $want", ({ piece, want }) => {
    expect(utils.promotionOf(piece)).toBe(want)
  })
})

describe("toPos", () => {
  const tests: Array<{ square: Square; want: [File, Rank] }> = [
    { square: SQUARE.SQ_11, want: [FILE.F1, RANK.R1] },
    { square: SQUARE.SQ_23, want: [FILE.F2, RANK.R3] },
    { square: SQUARE.SQ_47, want: [FILE.F4, RANK.R7] },
  ]
  test.each(tests)("toPos($square) should be $want", ({ square, want }) => {
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
  const tests: Array<{ square: Square; want: File }> = [
    { square: SQUARE.SQ_11, want: FILE.F1 },
    { square: SQUARE.SQ_23, want: FILE.F2 },
    { square: SQUARE.SQ_47, want: FILE.F4 },
  ]
  test.each(tests)("toFile($square) should be $want", ({ square, want }) => {
    expect(utils.toFile(square)).toBe(want)
  })
})

describe("toRank", () => {
  const tests: Array<{ square: Square; want: Rank }> = [
    { square: SQUARE.SQ_11, want: RANK.R1 },
    { square: SQUARE.SQ_23, want: RANK.R3 },
    { square: SQUARE.SQ_47, want: RANK.R7 },
  ]
  test.each(tests)("toRank($square) should be $want", ({ square, want }) => {
    expect(utils.toRank(square)).toBe(want)
  })
})

describe("filpFile", () => {
  const tests: Array<{ square: Square; want: Square }> = [
    { square: SQUARE.SQ_11, want: SQUARE.SQ_91 },
    { square: SQUARE.SQ_23, want: SQUARE.SQ_83 },
    { square: SQUARE.SQ_47, want: SQUARE.SQ_67 },
  ]
  test.each(tests)("flipFile($square) should be $want", ({ square, want }) => {
    expect(utils.flipFile(square)).toBe(want)
  })
})

describe("filpRank", () => {
  const tests: Array<{ square: Square; want: Square }> = [
    { square: SQUARE.SQ_11, want: SQUARE.SQ_19 },
    { square: SQUARE.SQ_23, want: SQUARE.SQ_27 },
    { square: SQUARE.SQ_47, want: SQUARE.SQ_43 },
  ]
  test.each(tests)("flipRank($square) should be $want", ({ square, want }) => {
    expect(utils.flipRank(square)).toBe(want)
  })
})

describe("numOf", () => {
  const tests: Array<{ hand: Hand; role: Role; want: number }> = [
    { hand: 0b00_00_000_000_000_000_00000, role: ROLE.Pawn, want: 0 },
    { hand: 0b00_00_000_000_000_000_01010, role: ROLE.Pawn, want: 10 },
    { hand: 0b00_00_000_000_000_000_00010, role: ROLE.Lance, want: 0 },
    { hand: 0b00_00_000_000_000_001_00010, role: ROLE.Lance, want: 1 },
    { hand: 0b00_00_000_000_000_100_00010, role: ROLE.Lance, want: 4 },
    { hand: 0b00_00_000_000_001_100_00010, role: ROLE.Knight, want: 1 },
    { hand: 0b00_00_000_000_001_100_00010, role: ROLE.Bishop, want: 0 },
    { hand: 0b00_01_000_000_001_100_00010, role: ROLE.Bishop, want: 1 },
    { hand: 0b10_01_000_000_001_100_00010, role: ROLE.Rook, want: 2 },
  ]
  test.each(tests)("numOf($hand, $role)", ({ hand, role, want }) => {
    expect(utils.numOf(hand, role)).toBe(want)
  })
})

describe("hPlus", () => {
  const tests: Array<{ hand: Hand; role: Role; want: number }> = [
    { hand: 0b00_00_000_000_000_000_00000, role: ROLE.Pawn, want: 1 },
    { hand: 0b00_00_000_000_000_000_01010, role: ROLE.Pawn, want: 11 },
    { hand: 0b00_00_000_000_000_000_00010, role: ROLE.Lance, want: 1 },
    { hand: 0b00_00_000_000_000_001_00010, role: ROLE.Lance, want: 2 },
    { hand: 0b00_00_000_000_001_100_00010, role: ROLE.Knight, want: 2 },
    { hand: 0b00_00_000_000_001_100_00010, role: ROLE.Bishop, want: 1 },
    { hand: 0b00_01_000_000_001_100_00010, role: ROLE.Bishop, want: 2 },
  ]
  test.each(tests)("hPlus($hand, $role)", ({ hand, role, want }) => {
    expect(utils.numOf(utils.hPlus(hand, role), role)).toBe(want)
  })
})

describe("hMinus", () => {
  const tests: Array<{ hand: Hand; role: Role; want: number }> = [
    { hand: 0b00_00_000_000_000_000_01010, role: ROLE.Pawn, want: 9 },
    { hand: 0b00_00_000_000_000_001_00010, role: ROLE.Lance, want: 0 },
    { hand: 0b00_00_000_000_000_100_00010, role: ROLE.Lance, want: 3 },
    { hand: 0b00_00_000_000_001_100_00010, role: ROLE.Knight, want: 0 },
    { hand: 0b00_01_000_000_001_100_00010, role: ROLE.Bishop, want: 0 },
    { hand: 0b10_01_000_000_001_100_00010, role: ROLE.Rook, want: 1 },
  ]
  test.each(tests)("hMinus($hand, $role)", ({ hand, role, want }) => {
    expect(utils.numOf(utils.hMinus(hand, role), role)).toBe(want)
  })
})

describe("fromSq", () => {
  const tests: Array<{ move: Move; want: Square }> = [
    { move: 0b00_0000001_0000000, want: SQUARE.SQ_12 },
    { move: 0b00_1000010_1000001, want: SQUARE.SQ_84 },
  ]
  test.each(tests)("fromSq($move)", ({ move, want }) => {
    expect(utils.fromSq(move)).toBe(want)
  })
})

describe("toSq", () => {
  const tests: Array<{ move: Move; want: Square }> = [
    { move: 0b00_0000001_0000000, want: SQUARE.SQ_11 },
    { move: 0b00_1000010_1000001, want: SQUARE.SQ_83 },
  ]
  test.each(tests)("toSq($move)", ({ move, want }) => {
    expect(utils.toSq(move)).toBe(want)
  })
})

describe("isPromotion", () => {
  const tests: Array<{ move: Move; want: boolean }> = [
    { move: 0b00_0000001_0000000, want: false },
    { move: 0b01_1000010_1000001, want: true },
  ]
  test.each(tests)("isPromotion($move)", ({ move, want }) => {
    expect(utils.isPromotion(move)).toBe(want)
  })
})

describe("isDrop", () => {
  const tests: Array<{ move: Move; want: boolean }> = [
    { move: 0b00_0000001_0000000, want: false },
    { move: 0b10_1000010_1000001, want: true },
  ]
  test.each(tests)("isDrop($move)", ({ move, want }) => {
    expect(utils.isDrop(move)).toBe(want)
  })
})

describe("makeMove", () => {
  const tests: Array<{ from: Square; to: Square; promotion: boolean; drop: boolean; want: Move }> = [
    { from: SQUARE.SQ_12, to: SQUARE.SQ_11, promotion: false, drop: false, want: 0b00_0000001_0000000 },
    { from: SQUARE.SQ_84, to: SQUARE.SQ_83, promotion: false, drop: false, want: 0b00_1000010_1000001 },
    { from: SQUARE.SQ_12, to: SQUARE.SQ_11, promotion: true, drop: false, want: 0b01_0000001_0000000 },
    { from: SQUARE.SQ_84, to: SQUARE.SQ_83, promotion: false, drop: true, want: 0b10_1000010_1000001 },
  ]
  test.each(tests)("makeMove($from, $to, $promotion, $drop)", ({ from, to, promotion, drop, want }) => {
    expect(utils.makeMove(from, to, promotion, drop)).toBe(want)
  })
})
