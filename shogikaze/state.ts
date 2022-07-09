import { Bitboard } from "./bitboard"
import { COLOR, FILE, PIECE, Piece, RANK, Role, ROLE, Square, SQUARE } from "./types"
import { colorOf, roleOf, toSquare } from "./utils"

/* eslint-disable */
const debugPiecePrint: Record<Piece, string> = {
  0:  " 口", 32: "ERR",
  1:  " 歩", 2:  " 香", 3:  " 桂", 4:  " 銀", 5:  " 金", 6:  " 角", 7:  " 飛", 8:  " 王",
  9:  " と", 10: " 杏", 11: " 圭", 12: " 全", 14: " 馬", 15: " 竜",
  17: "v歩", 18: "v香", 19: "v桂", 20: "v銀", 21: "v金", 22: "v角", 23: "v飛", 24: "v王",
  25: "vと", 26: "v杏", 27: "v圭", 28: "v全", 30: "v馬", 31: "v竜",
}
/* eslint-enable */

export class State {
  private pieces: Piece[] = new Array(SQUARE.NB).fill(PIECE.NO_PICE)
  private byColorBB: Bitboard[] = Array.from({ length: COLOR.NB }, () => Bitboard.empty())
  private byRoleBB: Bitboard[] = Array.from({ length: ROLE.NB }, () => Bitboard.empty())

  static empty(): State {
    return new State()
  }

  byColor(color: Role): Bitboard {
    return this.byColorBB[color]
  }

  byRole(role: Role): Bitboard {
    return this.byRoleBB[role]
  }

  pieceOn(square: Square): Piece {
    return this.pieces[square]
  }

  putPiece(piece: Piece, square: Square) {
    this.pieces[square] = piece
    this.byColorBB[colorOf(piece)].on(square)
    this.byRoleBB[ROLE.ALL].on(square)
    this.byRoleBB[roleOf(piece)].on(square)
  }

  removePiece(square: Square) {
    const piece = this.pieceOn(square)
    this.pieces[square] = PIECE.NO_PICE
    this.byColorBB[colorOf(piece)].off(square)
    this.byRoleBB[ROLE.ALL].off(square)
    this.byRoleBB[roleOf(piece)].off(square)
  }

  movePiece(from: Square, to: Square) {
    const piece = this.pieceOn(from)
    const fromTo = Bitboard.or(Bitboard.square(from), Bitboard.square(to))
    this.byColorBB[colorOf(piece)] = Bitboard.xor(this.byColorBB[colorOf(piece)], fromTo)
    this.byRoleBB[roleOf(piece)] = Bitboard.xor(this.byRoleBB[roleOf(piece)], fromTo)
    this.byRoleBB[ROLE.ALL] = Bitboard.xor(this.byRoleBB[ROLE.ALL], fromTo)
    this.pieces[from] = PIECE.NO_PICE
    this.pieces[to] = piece
  }

  toString(): string {
    let builder = ""
    for (let r = RANK.R1; r < RANK.NB; r++) {
      for (let f = FILE.F9; f >= FILE.F1; f--) {
        const piece = this.pieceOn(toSquare(f, r))
        builder += debugPiecePrint[piece] ?? debugPiecePrint[PIECE.NB]
        builder += " "
      }
      builder += "\n"
    }
    return builder
  }
}
