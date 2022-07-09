import { COLOR, Color, File, FILE, Piece, Rank, RANK, ROLE, Role, Square } from "./types"

export const toggleColor = (color: Color): Color => (color ^ COLOR.White) as Color
export const togglePiece = (piece: Piece): Piece => (piece ^ 16) as Piece

export const colorOf = (piece: Piece): Color => ((piece & 16) === 0 ? COLOR.Black : COLOR.White) as Color
export const roleOf = (piece: Piece): Role => (piece & 15) as Role
export const promotionOf = (piece: Piece): boolean => (piece & 8) !== 0 && roleOf(piece) !== ROLE.King

export const toPos = (square: Square): [File, Rank] => [
  (square / FILE.NB | 0) as File,
  (square % RANK.NB) as Rank,
]
export const toSquare = (file: File, rank: Rank): Square => file * FILE.NB + rank as Square

export const toFile = (square: Square): File => toPos(square)[0]
export const toRank = (square: Square): Rank => toPos(square)[1]

export const flipFile = (square: Square): Square => (square - 18 * toFile(square) + 72) as Square
export const flipRank = (square: Square): Square => (square - 2 * toRank(square) + 8) as Square

export const reverse27bit = (x: number): number => {
  x = (x & 0x55555555) << 1 | (x & 0xAAAAAAAA) >>> 1
  x = (x & 0x33333333) << 2 | (x & 0xCCCCCCCC) >>> 2
  x = (x & 0x0F0F0F0F) << 4 | (x & 0xF0F0F0F0) >>> 4
  x = (x & 0x00FF00FF) << 8 | (x & 0xFF00FF00) >>> 8
  x = (x & 0x0000FFFF) << 16 | (x & 0xFFFF0000) >>> 16
  return x >>> 5 // 32bit - 27bit = 5bit
}

export const mod = (x: number, n: number): number => (x % n + n) % n
