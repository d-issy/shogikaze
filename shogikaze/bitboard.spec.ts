import { Bitboard } from "./bitboard"
import { SQUARE } from "./types"

test("", () => {
  const sq = SQUARE.SQ_32
  const a = Bitboard.or(
    Bitboard.diagMask(sq),
    Bitboard.antiDiagMask(sq),
  )
  // console.debug(a.toString())
})
