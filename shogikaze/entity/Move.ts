import { ICloneable, IEqualable } from "../interface/IClass";
import Piece from "./Piece";
import Square from "./Square";

interface IValue {
    piece: Piece
    from?: Square
    to: Square
    promoted?: boolean
    dropped?: boolean
    captured?: Piece
}

export default class Move implements IEqualable, ICloneable {
    constructor(
        public piece: Piece,
        public from: Square,
        public to: Square,
        public promoted: boolean,
        public dropped: boolean,
        public captured: Piece,
    ) { }

    public eq(other: Move): boolean {
        return this.piece.eq(other.piece)
            && this.from.eq(other.from)
            && this.to.eq(other.to)
            && this.promoted === other.promoted
            && this.dropped === other.dropped
            && this.captured.eq(other.captured)
    }
    public clone(): Move { return new Move(this.piece, this.from, this.to, this.promoted, this.dropped, this.captured) }

    public static make(m: IValue) {
        return new Move(m.piece, m.from ?? Square.EMPTY, m.to, m.promoted ?? false, m.dropped ?? false, m.captured ?? Piece.EMPTY)
    }

    public isLegal(): boolean {
        // 取れない駒を取る
        if (this.piece.color().eq(this.captured.color())) { return false }
        // 行き所のない駒
        if (!this.promoted || this.dropped) {
            if (this.to.rank() == 0 && this.piece.between(Piece.BPawn, Piece.BKnight)) { return false }
            if (this.to.rank() == 8 && this.piece.between(Piece.WPawn, Piece.WKnight)) { return false }
            if (this.to.rank() == 1 && this.piece.eq(Piece.BKnight)) { return false }
            if (this.to.rank() == 7 && this.piece.eq(Piece.WKnight)) { return false }
        }
        return true
    }
}
