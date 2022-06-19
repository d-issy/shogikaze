import Move from "../../entity/Move";
import { FILE_MAP, findSymbol, RANK_MAP } from "./Usi";

export default class UsiMove {
    public constructor(public v: string) { }

    public static FromMoves(moves: Move[]): string {
        return moves.map(v => this.FromMove(v)).join(' ')
    }

    public static FromMove(move: Move): string {
        const ff = !move.dropped ? FILE_MAP[move.from.file()] : findSymbol(move.piece)?.toUpperCase()
        const fr = !move.dropped ? RANK_MAP[move.from.rank()]: '*'
        const tf = FILE_MAP[move.to.file()]
        const tr = RANK_MAP[move.to.rank()]
        const p = move.promoted ? '+' : ''
        return `${ff}${fr}${tf}${tr}${p}`
    }
}
