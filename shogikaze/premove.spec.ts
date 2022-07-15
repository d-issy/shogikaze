import { Bitboard } from "./bitboard"
import { premove } from "./premove"
import { State } from "./state"
import { FILE, PIECE, SQUARE } from "./types"

const check = (want: Bitboard, actual: Bitboard) => {
  expect(want.toString()).toBe(actual.toString())
}

describe("premove", () => {
  describe("pawn", () => {
    test("black", () => {
      const state = State.empty()
      state.putPiece(PIECE.BPawn, SQUARE.SQ_17)
      state.putPiece(PIECE.BPawn, SQUARE.SQ_11)
      check(premove(state, SQUARE.SQ_17), Bitboard.square(SQUARE.SQ_16))
      check(premove(state, SQUARE.SQ_11), Bitboard.empty())
    })
    test("white", () => {
      const state = State.empty()
      state.putPiece(PIECE.WPawn, SQUARE.SQ_93)
      state.putPiece(PIECE.WPawn, SQUARE.SQ_99)
      check(premove(state, SQUARE.SQ_93), Bitboard.square(SQUARE.SQ_94))
      check(premove(state, SQUARE.SQ_99), Bitboard.empty())
    })
  })

  describe("lance", () => {
    test("black", () => {
      const state = State.empty()
      state.putPiece(PIECE.BLance, SQUARE.SQ_58)
      state.putPiece(PIECE.WPawn, SQUARE.SQ_53)
      check(
        premove(state, SQUARE.SQ_58),
        Bitboard.sub(Bitboard.file(FILE.F5), Bitboard.squares(SQUARE.SQ_51, SQUARE.SQ_52, SQUARE.SQ_58, SQUARE.SQ_59)),
      )
      state.putPiece(PIECE.BLance, SQUARE.SQ_48)
    })

    test("white", () => {
      const state = State.empty()
      state.putPiece(PIECE.WLance, SQUARE.SQ_52)
      state.putPiece(PIECE.BPawn, SQUARE.SQ_58)
      check(
        premove(state, SQUARE.SQ_52),
        Bitboard.sub(Bitboard.file(FILE.F5), Bitboard.squares(SQUARE.SQ_51, SQUARE.SQ_52, SQUARE.SQ_59)),
      )
    })
  })

  describe("knight", () => {
    test("black", () => {
      const state = State.empty()
      state.putPiece(PIECE.BKnight, SQUARE.SQ_25)
      state.putPiece(PIECE.BKnight, SQUARE.SQ_21)
      check(premove(state, SQUARE.SQ_25), Bitboard.squares(SQUARE.SQ_13, SQUARE.SQ_33))
      check(premove(state, SQUARE.SQ_21), Bitboard.empty())
    })
    test("white", () => {
      const state = State.empty()
      state.putPiece(PIECE.WKnight, SQUARE.SQ_85)
      state.putPiece(PIECE.WKnight, SQUARE.SQ_89)
      check(premove(state, SQUARE.SQ_85), Bitboard.squares(SQUARE.SQ_77, SQUARE.SQ_97))
      check(premove(state, SQUARE.SQ_89), Bitboard.empty())
    })
  })

  describe("silver", () => {
    test("black", () => {
      const state = State.empty()
      state.putPiece(PIECE.BSilver, SQUARE.SQ_55)
      check(
        premove(state, SQUARE.SQ_55),
        Bitboard.squares(SQUARE.SQ_44, SQUARE.SQ_46, SQUARE.SQ_54, SQUARE.SQ_64, SQUARE.SQ_66),
      )
    })
    test("white", () => {
      const state = State.empty()
      state.putPiece(PIECE.WSilver, SQUARE.SQ_55)
      check(
        premove(state, SQUARE.SQ_55),
        Bitboard.squares(SQUARE.SQ_44, SQUARE.SQ_46, SQUARE.SQ_56, SQUARE.SQ_64, SQUARE.SQ_66),
      )
    })
  })

  describe("gold", () => {
    test("black", () => {
      const state = State.empty()
      state.putPiece(PIECE.BGold, SQUARE.SQ_55)
      check(
        premove(state, SQUARE.SQ_55),
        Bitboard.squares(SQUARE.SQ_44, SQUARE.SQ_45, SQUARE.SQ_54, SQUARE.SQ_56, SQUARE.SQ_64, SQUARE.SQ_65),
      )
    })
    test("white", () => {
      const state = State.empty()
      state.putPiece(PIECE.WGold, SQUARE.SQ_55)
      check(
        premove(state, SQUARE.SQ_55),
        Bitboard.squares(SQUARE.SQ_45, SQUARE.SQ_46, SQUARE.SQ_54, SQUARE.SQ_56, SQUARE.SQ_65, SQUARE.SQ_66),
      )
    })
  })

  test("rook", () => {
    const state = State.empty()
    // slider
    state.putPiece(PIECE.BRook, SQUARE.SQ_55)

    // occupied
    state.putPiece(PIECE.WPawn, SQUARE.SQ_53)
    state.putPiece(PIECE.BPawn, SQUARE.SQ_35)
    state.putPiece(PIECE.BPawn, SQUARE.SQ_95)
    state.putPiece(PIECE.BPawn, SQUARE.SQ_59)

    check(
      premove(state, SQUARE.SQ_55),
      Bitboard.squares(SQUARE.SQ_45, SQUARE.SQ_53, SQUARE.SQ_54, SQUARE.SQ_56, SQUARE.SQ_57, SQUARE.SQ_58, SQUARE.SQ_65, SQUARE.SQ_75, SQUARE.SQ_85),
    )
  })

  test("bishop", () => {
    const state = State.empty()
    // slider
    state.putPiece(PIECE.BBishop, SQUARE.SQ_55)
    // occupied
    state.putPiece(PIECE.WPawn, SQUARE.SQ_11)
    state.putPiece(PIECE.BPawn, SQUARE.SQ_28)
    state.putPiece(PIECE.BPawn, SQUARE.SQ_73)
    state.putPiece(PIECE.BPawn, SQUARE.SQ_88)

    check(
      premove(state, SQUARE.SQ_55),
      Bitboard.squares(
        SQUARE.SQ_11, SQUARE.SQ_22, SQUARE.SQ_33, SQUARE.SQ_44,
        SQUARE.SQ_37, SQUARE.SQ_46,
        SQUARE.SQ_64,
        SQUARE.SQ_66, SQUARE.SQ_77,
      ),
    )
  })

  test("king", () => {
    const state = State.empty()
    state.putPiece(PIECE.BKing, SQUARE.SQ_55)
    check(
      premove(state, SQUARE.SQ_55),
      Bitboard.squares(
        SQUARE.SQ_44, SQUARE.SQ_45, SQUARE.SQ_46,
        SQUARE.SQ_54, SQUARE.SQ_56,
        SQUARE.SQ_64, SQUARE.SQ_65, SQUARE.SQ_66,
      ),
    )
  })

  test("horse", () => {
    const state = State.empty()
    state.putPiece(PIECE.BHourse, SQUARE.SQ_55)
    check(
      premove(state, SQUARE.SQ_55),
      Bitboard.squares(
        SQUARE.SQ_11, SQUARE.SQ_22, SQUARE.SQ_33, SQUARE.SQ_44,
        SQUARE.SQ_19, SQUARE.SQ_28, SQUARE.SQ_37, SQUARE.SQ_46,
        SQUARE.SQ_64, SQUARE.SQ_73, SQUARE.SQ_82, SQUARE.SQ_91,
        SQUARE.SQ_66, SQUARE.SQ_77, SQUARE.SQ_88, SQUARE.SQ_99,
        SQUARE.SQ_45, SQUARE.SQ_54, SQUARE.SQ_56, SQUARE.SQ_65,
      ),
    )
  })

  test("dragon", () => {
    const state = State.empty()
    state.putPiece(PIECE.BDragon, SQUARE.SQ_55)
    check(
      premove(state, SQUARE.SQ_55),
      Bitboard.squares(
        SQUARE.SQ_15, SQUARE.SQ_25, SQUARE.SQ_35, SQUARE.SQ_45,
        SQUARE.SQ_51, SQUARE.SQ_52, SQUARE.SQ_53, SQUARE.SQ_54,
        SQUARE.SQ_56, SQUARE.SQ_57, SQUARE.SQ_58, SQUARE.SQ_59,
        SQUARE.SQ_65, SQUARE.SQ_75, SQUARE.SQ_85, SQUARE.SQ_95,
        SQUARE.SQ_44, SQUARE.SQ_46, SQUARE.SQ_64, SQUARE.SQ_66,
      ),
    )
  })

})
