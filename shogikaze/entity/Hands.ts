import { ICloneable, IEqualable } from '../interface/IClass'
import Piece from './Piece'

export default class Hands implements IEqualable, ICloneable {
    private constructor(public readonly v: { [index: number]: number }) { }

    public static empty(): Hands {
        const v: { [index: number]: number } = {}
        v[Piece.BPawn.v]   = 0
        v[Piece.BLance.v]  = 0
        v[Piece.BKnight.v] = 0
        v[Piece.BSilver.v] = 0
        v[Piece.BGold.v]   = 0
        v[Piece.BHorse.v]  = 0
        v[Piece.BRook.v]   = 0

        v[Piece.WPawn.v]   = 0
        v[Piece.WLance.v]  = 0
        v[Piece.WKnight.v] = 0
        v[Piece.WSilver.v] = 0
        v[Piece.WGold.v]   = 0
        v[Piece.WHorse.v]  = 0
        v[Piece.WRook.v]   = 0
        return new Hands(v)
    }

    public eq(other: Hands): boolean { return this.v === other.v }
    public clone(): Hands { return new Hands(Object.assign({}, this.v)) }
    public count(p: Piece): number { return p.v in this.v ? this.v[p.v] : 0 }

    public push(p: Piece, amount: number = 1) {
        this.v[p.unPromote().v] += amount
    }

    public pop(p: Piece): Piece {
        if (!(p.v in this.v) || this.count(p) === 0) {
            return Piece.EMPTY
        }
        this.v[p.v] -= 1
        return p
    }
}
