import { FILE, File, Rank, RANK, Square } from "./types"
import { mod, reverse27bit, toPos, toSquare } from "./utils"

const SPLIT_MAX = 0x7ff_ffff

export class Bitboard {
  private constructor(private high = 0, private middle = 0, private low = 0) { }

  static all(): Bitboard {
    return new Bitboard().not()
  }

  static empty(): Bitboard {
    return new Bitboard(0, 0, 0)
  }

  static square(square: Square): Bitboard {
    return new Bitboard(0, 0, 0).on(square)
  }

  static squares(...squares: Square[]): Bitboard {
    return Bitboard.or(...squares.map((sq) => Bitboard.square(sq)))
  }

  public static file(file: File): Bitboard {
    return this.FILE1_BB.shiftL(FILE.NB * file)
  }

  public static files(...files: File[]): Bitboard {
    return Bitboard.or(...files.map((f) => Bitboard.file(f)))
  }

  public static rank(rank: Rank): Bitboard {
    return this.RANK1_BB.shiftL(rank)
  }

  public static ranks(...ranks: Rank[]): Bitboard {
    return Bitboard.or(...ranks.map((r) => Bitboard.rank(r)))
  }

  public static diagMask(square: Square): Bitboard {
    const [file, rank] = toPos(square)
    return Bitboard.DIAG_MASKS_BB[file + rank]
  }

  public static antiDiagMask(square: Square): Bitboard {
    const [file, rank] = toPos(square)
    return Bitboard.ANTI_DIAG_MASKS_BB[mod(rank - file, 17)]
  }

  public static withoutOtherSide(board: Bitboard, square: Square): Bitboard {
    const [file, rank] = toPos(square)
    let side = this.empty()
    // TODO: refactoring
    if (file === FILE.F1) {
      side = this.or(side, this.file(FILE.F9))
    } if (file === FILE.F9) {
      side = this.or(side, this.file(FILE.F1))
    } if (rank === RANK.R1) {
      side = this.or(side, this.rank(RANK.R9))
    }
    if (rank === RANK.R9) {
      side = this.or(side, this.file(RANK.R1))
    }
    return this.and(board, side.not())
  }

  get(sq: Square): boolean {
    if (sq < 27) {
      return (this.low & 1 << sq) !== 0
    }
    if (sq < 54) {
      return (this.middle & 1 << sq - 27) !== 0
    }
    if (sq < 81) {
      return (this.high & 1 << sq - 54) !== 0
    }
    return false
  }

  on(sq: Square): Bitboard {
    if (sq < 27) {
      this.low = this.low | 1 << sq
    }
    else if (sq < 54) {
      this.middle = this.middle | 1 << sq - 27
    }
    else if (sq < 81) {
      this.high = this.high | 1 << sq - 54
    }
    return this
  }

  off(sq: Square): Bitboard {
    if (sq < 27) {
      this.low = this.low & ~(1 << sq)
    }
    else if (sq < 54) {
      this.middle = this.middle & ~(1 << sq - 27)
    }
    else if (sq < 81) {
      this.high = this.high & ~(1 << sq - 54)
    }
    return this
  }

  not(): Bitboard {
    return new Bitboard(~this.high & SPLIT_MAX, ~this.middle & SPLIT_MAX, ~this.low & SPLIT_MAX)
  }

  static offsets(sq: Square, ...args: number[]): Bitboard {
    return Bitboard.or(...args.map(
      (offset: number) => offset >= 0 ? this.square(sq).shiftL(offset) : this.square(sq).shiftR(-offset),
    ))
  }

  static offsetsWithoutOtherSide(sq: Square, ...args: number[]): Bitboard {
    return Bitboard.withoutOtherSide(this.offsets(sq, ...args), sq)
  }

  static and(...args: Bitboard[]): Bitboard {
    return args.reduce(
      (a, b) => new Bitboard(
        a.high & b.high,
        a.middle & b.middle,
        a.low & b.low,
      ),
      Bitboard.all(),
    )
  }

  static or(...args: Bitboard[]): Bitboard {
    return args.reduce(
      (a, b) => new Bitboard(
        a.high | b.high,
        a.middle | b.middle,
        a.low | b.low,
      ),
      Bitboard.empty(),
    )
  }

  static xor(a: Bitboard, b: Bitboard): Bitboard {
    return new Bitboard(
      a.high ^ b.high,
      a.middle ^ b.middle,
      a.low ^ b.low,
    )
  }

  shiftL(x: number): Bitboard {
    let high, middle, low
    if (x < 27) {
      low = this.low << x & SPLIT_MAX
      middle = this.middle << x & SPLIT_MAX | this.low >> 27 - x
      high = this.high << x & SPLIT_MAX | this.middle >> 27 - x
    }
    else if (x < 54) {
      middle = this.low << x - 27 & SPLIT_MAX
      high = this.middle << x - 27 & SPLIT_MAX | this.low >> 54 - x
    }
    else if (x < 81) {
      high = this.low << x - 54 & SPLIT_MAX
    }
    return new Bitboard(high, middle, low)
  }

  shiftR(x: number): Bitboard {
    let high, middle, low
    if (x < 27) {
      low = this.middle << 27 - x & SPLIT_MAX | this.low >> x
      middle = this.high << 27 - x & SPLIT_MAX | this.middle >> x
      high = this.high >> x
    }
    else if (x < 54) {
      low = this.middle >> x - 27 & SPLIT_MAX
      middle = this.high >> x - 27 & SPLIT_MAX
    }
    else if (x < 81) {
      low = this.high >> x - 54 & SPLIT_MAX
    }
    return new Bitboard(high, middle, low)
  }

  static sub(a: Bitboard, b: Bitboard): Bitboard {
    let borrow

    const low = a.low - b.low
    borrow = low < 0 ? 1 : 0

    const middle = a.middle - b.middle - borrow
    borrow = middle < 0 ? 1 : 0

    return new Bitboard(
      a.high - b.high - borrow & SPLIT_MAX,
      middle & SPLIT_MAX,
      low & SPLIT_MAX,
    )
  }

  reverse(): Bitboard {
    return new Bitboard(
      reverse27bit(this.low),
      reverse27bit(this.middle),
      reverse27bit(this.high),
    )
  }


  toString(): string {
    let builder = ""
    for (let r = RANK.R1; r < RANK.NB; r++) {
      for (let f = FILE.F9; f >= FILE.F1; f--) {
        builder += this.get(toSquare(f, r)) ? 1 : 0
        builder += " "
      }
      builder += "\n"
    }
    return builder
  }

  private static readonly FILE1_BB = new Bitboard(0, 0, 0x000_01ff)
  private static readonly RANK1_BB = new Bitboard(0x004_0201, 0x004_0201, 0x004_0201)

  /**
   * anti diagonals
   * file + rank
   * 08 07 06 05 04 03 02 01 00
   * 09 08 07 06 05 04 03 02 01
   * 10 09 08 07 06 05 04 03 02
   * 11 10 09 08 07 06 05 04 03
   * 12 11 10 09 08 07 06 05 04
   * 13 12 11 10 09 08 07 06 05
   * 14 13 12 11 10 09 08 07 06
   * 15 14 13 12 11 10 09 08 07
   * 16 15 14 13 12 11 10 09 08
   */
  private static readonly DIAG_MASKS_BB = [
    new Bitboard(0x0000000, 0x0000000, 0x0000001),
    new Bitboard(0x0000000, 0x0000000, 0x0000202),
    new Bitboard(0x0000000, 0x0000000, 0x0040404),
    new Bitboard(0x0000000, 0x0000001, 0x0080808),
    new Bitboard(0x0000000, 0x0000202, 0x0101010),
    new Bitboard(0x0000000, 0x0040404, 0x0202020),
    new Bitboard(0x0000001, 0x0080808, 0x0404040),
    new Bitboard(0x0000202, 0x0101010, 0x0808080),
    new Bitboard(0x0040404, 0x0202020, 0x1010100),
    new Bitboard(0x0080808, 0x0404040, 0x2020000),
    new Bitboard(0x0101010, 0x0808080, 0x4000000),
    new Bitboard(0x0202020, 0x1010100),
    new Bitboard(0x0404040, 0x2020000),
    new Bitboard(0x0808080, 0x4000000),
    new Bitboard(0x1010100),
    new Bitboard(0x2020000),
    new Bitboard(0x4000000),
  ]

  /**
   * anti diagonals
   *  mod(rank - file, 17)
   * 09 10 11 12 13 14 15 16 00
   * 10 11 12 13 14 15 16 00 01
   * 11 12 13 14 15 16 00 01 02
   * 12 13 14 15 16 00 01 02 03
   * 13 14 15 16 00 01 02 03 04
   * 14 15 16 00 01 02 03 04 05
   * 15 16 00 01 02 03 04 05 06
   * 16 00 01 02 03 04 05 06 07
   * 00 01 02 03 04 05 06 07 08
   */
  private static readonly ANTI_DIAG_MASKS_BB = [
    new Bitboard(0x4010040, 0x0802008, 0x0100401),
    new Bitboard(0x8020080, 0x1004010, 0x0200802),
    new Bitboard(0x0000100, 0x2008020, 0x0401004),
    new Bitboard(0x0000000, 0x4010040, 0x0802008),
    new Bitboard(0x0000000, 0x0020080, 0x1004010),
    new Bitboard(0x0000000, 0x0000100, 0x2008020),
    new Bitboard(0x0000000, 0x0000000, 0x4010040),
    new Bitboard(0x0000000, 0x0000000, 0x0020080),
    new Bitboard(0x0000000, 0x0000000, 0x0000100),
    new Bitboard(0x0040000),
    new Bitboard(0x0080200),
    new Bitboard(0x0100401),
    new Bitboard(0x0200802, 0x0040000),
    new Bitboard(0x0401004, 0x0080200),
    new Bitboard(0x0802008, 0x0100401),
    new Bitboard(0x1004010, 0x0200802, 0x0040000),
    new Bitboard(0x2008020, 0x0401004, 0x0080200),
  ]
}
