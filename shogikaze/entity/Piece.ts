import { ICloneable, IEqualable } from "../interface/IClass"
import Color from "./Color"

const promote: number = 1 << 3
const black: number = 1 << 4
const white: number = 1 << 5

export default class Piece implements IEqualable, ICloneable {
    private constructor(public v: number) { }

    public eq(other: Piece): boolean { return this.v === other.v }
    public clone(): Piece { return new Piece(this.v) }
    public between(low: Piece, high: Piece): boolean { return low.v <= this.v && this.v <= high.v }

    public isEmpty(): boolean { return this.eq(Piece.EMPTY) }
    public isBlack(): boolean { return (this.v & black) !== 0 }
    public isWhite(): boolean { return (this.v & white) !== 0 }
    public isPromoted(): boolean { return (this.v & promote) !== 0 && !this.pieceType().eq(Piece.King) }
    public canPromoted(): boolean {
        return this.pt().between(Piece.Pawn, Piece.Silver)
            || this.pt().eq(Piece.Bishop)
            || this.pt().eq(Piece.Rook)
    }
    public canMove(rank: number): boolean {
        if (this.eq(Piece.BPawn) || this.eq(Piece.BLance)) { return rank !== 0 }
        if (this.eq(Piece.WPawn) || this.eq(Piece.WLance)) { return rank !== 8 }
        if (this.eq(Piece.BKnight)) { return rank <= 1 }
        if (this.eq(Piece.WKnight)) { return rank >= 7 }
        return false
     }

    public pieceType(): Piece { return new Piece(this.v & ~(black | white)) }
    public color(): Color { return this.isBlack() ? Color.BLACK : Color.WHITE }
    public promote(): Piece { return new Piece(this.v | promote) }
    public unPromote(): Piece { return new Piece(this.v & ~promote) }
    public opponent(): Piece { return new Piece(this.v ^ (black | white)) }

    // alias
    private pt(): Piece { return this.pieceType() }

    // basic piece types
    public static readonly EMPTY: Piece    = new Piece(0)
    public static readonly Pawn: Piece     = new Piece(1)
    public static readonly Lance: Piece    = new Piece(2)
    public static readonly Knight: Piece   = new Piece(3)
    public static readonly Silver: Piece   = new Piece(4)
    public static readonly Gold: Piece     = new Piece(5)
    public static readonly Bishop: Piece   = new Piece(6)
    public static readonly Rook: Piece     = new Piece(7)
    public static readonly King: Piece     = new Piece(8)
    public static readonly PPawn: Piece    = new Piece(promote | Piece.Pawn.v)
    public static readonly PLance: Piece   = new Piece(promote | Piece.Lance.v)
    public static readonly PKnight: Piece  = new Piece(promote | Piece.Knight.v)
    public static readonly PSilver: Piece  = new Piece(promote | Piece.Silver.v)
    public static readonly Horse: Piece    = new Piece(promote | Piece.Bishop.v)
    public static readonly Dragon: Piece   = new Piece(promote | Piece.Rook.v)
    // Black pieces
    public static readonly BPawn: Piece    = new Piece(black | Piece.Pawn.v)
    public static readonly BLance: Piece   = new Piece(black | Piece.Lance.v)
    public static readonly BKnight: Piece  = new Piece(black | Piece.Knight.v)
    public static readonly BSilver: Piece  = new Piece(black | Piece.Silver.v)
    public static readonly BGold: Piece    = new Piece(black | Piece.Gold.v)
    public static readonly BBishop: Piece  = new Piece(black | Piece.Bishop.v)
    public static readonly BRook: Piece    = new Piece(black | Piece.Rook.v)
    public static readonly BKing: Piece    = new Piece(black | Piece.King.v)
    public static readonly BPPawn: Piece   = new Piece(black | Piece.PPawn.v)
    public static readonly BPLance: Piece  = new Piece(black | Piece.PLance.v)
    public static readonly BPKnight: Piece = new Piece(black | Piece.PKnight.v)
    public static readonly BPSilver: Piece = new Piece(black | Piece.PSilver.v)
    public static readonly BHorse: Piece   = new Piece(black | Piece.Horse.v)
    public static readonly BDragon: Piece  = new Piece(black | Piece.Dragon.v)
    // White pieces
    public static readonly WPawn: Piece    = new Piece(white | Piece.Pawn.v)
    public static readonly WLance: Piece   = new Piece(white | Piece.Lance.v)
    public static readonly WKnight: Piece  = new Piece(white | Piece.Knight.v)
    public static readonly WSilver: Piece  = new Piece(white | Piece.Silver.v)
    public static readonly WGold: Piece    = new Piece(white | Piece.Gold.v)
    public static readonly WBishop: Piece  = new Piece(white | Piece.Bishop.v)
    public static readonly WRook: Piece    = new Piece(white | Piece.Rook.v)
    public static readonly WKing: Piece    = new Piece(white | Piece.King.v)
    public static readonly WPPawn: Piece   = new Piece(white | Piece.PPawn.v)
    public static readonly WPLance: Piece  = new Piece(white | Piece.PLance.v)
    public static readonly WPKnight: Piece = new Piece(white | Piece.PKnight.v)
    public static readonly WPSilver: Piece = new Piece(white | Piece.PSilver.v)
    public static readonly WHorse: Piece   = new Piece(white | Piece.Horse.v)
    public static readonly WDragon: Piece  = new Piece(white | Piece.Dragon.v)
}
