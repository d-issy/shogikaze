import Board from "../../entity/Board";
import Color from "../../entity/Color";
import Piece from "../../entity/Piece";
import Square from "../../entity/Square";
import { IEqualable } from "../../interface/IClass";
import { findPiece, findSymbol, PIECE_MAP } from "./Usi";

const SFEN_HIRATE = "sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL"

export default class Sfen implements IEqualable {
    public constructor(public v: string) { }
    public eq(other: Sfen): boolean { throw this.v === other.v }

    public static empty(): Sfen { return new Sfen("sfen 9/9/9/9/9/9/9/9/9 b - 1") }
    public static hirate(): Sfen { return new Sfen("startpos b - 1") }

    public static fromBoard(board: Board): Sfen {
        const builder: string[] = []
        builder.push("sfen ")
        // position
        let emptyCount = 0
        for (let r = 0; r < Board.RANKS; r++) {
            for (let f = Board.FILES - 1; f >= 0; f--) {
                const piece = board.get(Square.from(f, r))
                if (piece.eq(Piece.EMPTY)) {
                    emptyCount++
                    continue
                }
                if (emptyCount > 0) {
                    builder.push(emptyCount.toString())
                    emptyCount = 0
                }
                let symbol = findSymbol(piece)
                if (symbol) { builder.push(symbol) }
            }
            if (emptyCount > 0) {
                builder.push(emptyCount.toString())
                emptyCount = 0
            }
            if (r !== Board.RANKS - 1) { builder.push('/') }
        }
        // color
        builder.push(' ')
        if (board.turn.eq(Color.BLACK)) { builder.push('b') }
        else if (board.turn.eq(Color.WHITE)) { builder.push('w') }
        // hands
        builder.push(' ')
        let allCount = 0
        for (const [pieceId, count] of Object.entries(board.hands.v)) {
            if (count === 0) { continue }
            const symbol = PIECE_MAP.find(v => v.piece.v === Number(pieceId))?.symbol
            if (symbol) {
                allCount += count
                builder.push(count.toString())
                builder.push(symbol)
            }
        }
        // fin
        builder.push(" 1")
        return new Sfen(builder.join(""))
    }

    public toBoard(): Board {
        const board = Board.empty()
        const sfen = this.v.replace("startpos", SFEN_HIRATE).split(' ')
        Sfen.parsePos(sfen[1], board)
        Sfen.parseTurn(sfen[2], board)
        Sfen.parseHands(sfen[3], board)
        return board
    }

    private static parsePos(posPart: string, board: Board) {
        let f = Board.FILES - 1
        let r = 0
        for (let i = 0; i < posPart.length; i++) {
            if (r >= Board.RANKS) { break }
            const cc = posPart.charAt(i)
            const cn = posPart.charAt(i + 1)
            if (cc === '/') {
                f = Board.FILES - 1
                r++
                continue
            }
            if ('1' <= cc && cc <= '9') {
                f -= parseInt(cc)
                continue
            }

            const square = Square.from(f, r)
            let piece = findPiece(cc)
            if (piece) {
                if (cn === '+') {
                    piece = piece.promote()
                    i++
                }
                board.put(square, piece)
            }
            f--
        }
    }

    private static parseTurn(turnPart: string, board: Board) {
        if (turnPart === 'b') { board.turn = Color.BLACK }
        if (turnPart === 'w') { board.turn = Color.WHITE }
    }

    private static parseHands(handsPart: string, board: Board) {
        if (handsPart === '-') {
            return
        }
        let amount: number = 1
        for (let i = 0; i < handsPart.length; i++) {
            const cc = handsPart.charAt(i)
            const cn = handsPart.charAt(i + 1)
            if ('0' <= cc && cc <= '9') {
                amount = parseInt(cc)
                if ('0' <= cn && cn <= '9') {
                    amount = amount * 10 + parseInt(cn)
                    i++
                }
            } else {
                const piece = findPiece(cc)
                if (piece) { board.hands.push(piece, amount) }
                amount = 1
            }
        }
    }
}
