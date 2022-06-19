import Color from "./Color";
import Hands from "./Hands";
import Piece from "./Piece";

import { ICloneable, IEqualable } from "../interface/IClass";
import Square from "./Square";

export default class Board implements IEqualable, ICloneable {
    private constructor(
        public turn: Color,
        public pos: Piece[],
        public hands: Hands,
        public blackKingSq: Square = Square.EMPTY,
        public whiteKingSq: Square = Square.EMPTY,
    ) { }
    public eq(other: Board): boolean {
        for (let i = 0; i < this.pos.length; i++) {
            if (!this.pos[i].eq(other.pos[i])) { return false }
        }
        return this.turn.eq(other.turn) && this.hands.eq(other.hands)
    }
    public clone(): Board {
        const pos: Piece[] = new Array(81)
        for (let i = 0; i < this.pos.length; i++) {
            pos[i] = this.pos[i]
        }
        return new Board(this.turn, this.pos, this.hands.clone(), this.blackKingSq, this.whiteKingSq)
    }

    public static empty() {
        const pos = new Array<Piece>(81).fill(Piece.EMPTY)
        const hands = Hands.empty()
        return new Board(Color.BLACK, pos, hands)
    }

    public get(sq: Square): Piece { return this.pos[sq.v] }
    public put(sq: Square, piece: Piece) { this.pos[sq.v] = piece }

    public print(): string {
        const builder: string[] = []
        for (let r = 0; r < Board.RANKS; r++) {
            for (let f = Board.FILES - 1; f >= 0; f--) {
                builder.push(pieceMap[this.get(Square.from(f, r))?.v] ?? ' ..')
                builder.push(" ")
            }
            builder.push("\n")
        }
        return builder.join("")
    }

    public static readonly FILES = 9
    public static readonly RANKS = 9
}

const pieceMap: { [key: number]: string } = {}
pieceMap[Piece.BPawn.v]    = "^歩"
pieceMap[Piece.BLance.v]   = "^香"
pieceMap[Piece.BKnight.v]  = "^桂"
pieceMap[Piece.BSilver.v]  = "^銀"
pieceMap[Piece.BGold.v]    = "^金"
pieceMap[Piece.BBishop.v]  = "^角"
pieceMap[Piece.BRook.v]    = "^飛"
pieceMap[Piece.BKing.v]    = "^王"
pieceMap[Piece.BPPawn.v]   = "^と"
pieceMap[Piece.BPLance.v]  = "^杏"
pieceMap[Piece.BPKnight.v] = "^圭"
pieceMap[Piece.BPSilver.v] = "^全"
pieceMap[Piece.BHorse.v]   = "^馬"
pieceMap[Piece.BDragon.v]  = "^竜"
pieceMap[Piece.WPawn.v]    = "v歩"
pieceMap[Piece.WLance.v]   = "v香"
pieceMap[Piece.WKnight.v]  = "v桂"
pieceMap[Piece.WSilver.v]  = "v銀"
pieceMap[Piece.WGold.v]    = "v金"
pieceMap[Piece.WBishop.v]  = "v角"
pieceMap[Piece.WRook.v]    = "v飛"
pieceMap[Piece.WKing.v]    = "v王"
pieceMap[Piece.WPPawn.v]   = "vと"
pieceMap[Piece.WPLance.v]  = "v杏"
pieceMap[Piece.WPKnight.v] = "v圭"
pieceMap[Piece.WPSilver.v] = "v全"
pieceMap[Piece.WHorse.v]   = "v馬"
pieceMap[Piece.WDragon.v]  = "v竜"
