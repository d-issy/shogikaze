import { Bitboard } from "./bitboard"
import { State } from "./state"
import { COLOR, Color, RANK, Role, ROLE, Square } from "./types"
import { colorOf, roleOf, toPos } from "./utils"


const pawnAttacks = (color: Color) => (square: Square): Bitboard =>
  color === COLOR.Black
    ? Bitboard.and(Bitboard.square(square).shiftR(1), Bitboard.rank(RANK.R9).not())
    : Bitboard.and(Bitboard.square(square).shiftL(1), Bitboard.rank(RANK.R1).not())

const lanceAttacks = (color: Color, occupied: Bitboard) => (square: Square): Bitboard =>
  color === COLOR.Black
    ? negativeRayAttacks(occupied, Bitboard.file(toPos(square)[0]))(square)
    : positiveRayAttacks(occupied, Bitboard.file(toPos(square)[0]))(square)

const knightAttacks = (color: Color) => (square: Square): Bitboard =>
  color === COLOR.Black
    ? Bitboard.and(Bitboard.offsets(square, -11, 7), Bitboard.ranks(RANK.R8, RANK.R9).not())
    : Bitboard.and(Bitboard.offsets(square, -7, 11), Bitboard.ranks(RANK.R1, RANK.R2).not())

const silverAttacks = (color: Color) => (square: Square): Bitboard =>
  color === COLOR.Black
    ? Bitboard.offsetsWithoutOtherSide(square, -10, -8, -1, 8, 10)
    : Bitboard.offsetsWithoutOtherSide(square, -10, -8, 1, 8, 10)

const goldAttacks = (color: Color) => (square: Square): Bitboard =>
  color === COLOR.Black
    ? Bitboard.offsetsWithoutOtherSide(square, -10, -9, -1, 1, 8, 9)
    : Bitboard.offsetsWithoutOtherSide(square, -9, -8, -1, 1, 9, 10)

const bishopAttacks = (occupied: Bitboard) => (square: Square): Bitboard =>
  Bitboard.or(
    lineAttacks(occupied, Bitboard.diagMask(square))(square),
    lineAttacks(occupied, Bitboard.antiDiagMask(square))(square),
  )

const rookAttacks = (occupied: Bitboard) => (square: Square): Bitboard =>
  Bitboard.or(
    lineAttacks(occupied, Bitboard.file(toPos(square)[0]))(square),
    lineAttacks(occupied, Bitboard.rank(toPos(square)[1]))(square),
  )

const kingAttacks = (square: Square): Bitboard =>
  Bitboard.offsets(square, -10, -9, -8, -1, 1, 8, 9, 10)

const horseAttacks = (occupied: Bitboard) => (square: Square): Bitboard =>
  Bitboard.or(bishopAttacks(occupied)(square), kingAttacks(square))

const dragonAttacks = (occupied: Bitboard) => (square: Square): Bitboard =>
  Bitboard.or(rookAttacks(occupied)(square), kingAttacks(square))


const positiveRayAttacks = (occupied: Bitboard, mask: Bitboard) => (square: Square): Bitboard => {
  const o = Bitboard.and(occupied, mask)
  const s = Bitboard.square(square)
  const forward = Bitboard.xor(o, Bitboard.sub(o, s.shiftL(1))) // o ^ (o - 2s)
  return Bitboard.and(forward, mask)
}

const negativeRayAttacks = (occupied: Bitboard, mask: Bitboard) => (square: Square): Bitboard => {
  const o = Bitboard.and(occupied, mask)
  const s = Bitboard.square(square)
  const reverse = Bitboard.xor(o, Bitboard.sub(o.reverse(), s.reverse().shiftL(1)).reverse()) // o ^ (o' - 2s')'
  return Bitboard.and(reverse, mask)
}

const lineAttacks = (occupied: Bitboard, mask: Bitboard) => (square: Square): Bitboard => {
  const o = Bitboard.and(occupied, mask)
  const s = Bitboard.square(square)
  const left = Bitboard.sub(o, s.shiftL(1)) // o - 2s
  const right = Bitboard.sub(o.reverse(), s.reverse().shiftL(1)).reverse() // (o' - 2s')'
  return Bitboard.and(Bitboard.xor(left, right), mask) // (o - 2s) ^ (o' - 2s')'
}

export const premove = (state: State, square: Square): Bitboard => {
  const piece = state.pieceOn(square)
  const color = colorOf(piece)
  const role = roleOf(piece)

  const movable: Bitboard
    = role === ROLE.Gold || new Array<Role>(ROLE.ProPawn, ROLE.ProLance, ROLE.ProKnight, ROLE.ProSilver).includes(role)
      ? goldAttacks(color)(square)

      : role === ROLE.Pawn
      ? pawnAttacks(color)(square)

      : role === ROLE.Lance
      ? lanceAttacks(color, state.byRole(ROLE.ALL))(square)

      : role === ROLE.Knight
      ? knightAttacks(color)(square)

      : role === ROLE.Silver
      ? silverAttacks(color)(square)

      : role === ROLE.Bishop
      ? bishopAttacks(state.byRole(ROLE.ALL))(square)

      : role === ROLE.Rook
      ? rookAttacks(state.byRole(ROLE.ALL))(square)

      : role === ROLE.King
      ? kingAttacks(square)

      : role === ROLE.Horse
      ? horseAttacks(state.byRole(ROLE.ALL))(square)

      : role === ROLE.Dragon
      ? dragonAttacks(state.byRole(ROLE.ALL))(square)

      // unknown promotion
      : Bitboard.empty()

  return Bitboard.and(movable, state.byColor(color).not())
}
