import Piece from "../../entity/Piece"

export const PIECE_MAP: { symbol: string, piece: Piece }[] = [
    { symbol: 'P', piece: Piece.BPawn },
    { symbol: 'L', piece: Piece.BLance },
    { symbol: 'N', piece: Piece.BKnight },
    { symbol: 'S', piece: Piece.BSilver },
    { symbol: 'G', piece: Piece.BGold },
    { symbol: 'B', piece: Piece.BBishop },
    { symbol: 'R', piece: Piece.BRook },
    { symbol: 'K', piece: Piece.BKing },
    { symbol: 'p', piece: Piece.WPawn },
    { symbol: 'l', piece: Piece.WLance },
    { symbol: 'n', piece: Piece.WKnight },
    { symbol: 's', piece: Piece.WSilver },
    { symbol: 'g', piece: Piece.WGold },
    { symbol: 'b', piece: Piece.WBishop },
    { symbol: 'r', piece: Piece.WRook },
    { symbol: 'k', piece: Piece.WKing },
    { symbol: 'P+', piece: Piece.BPPawn },
    { symbol: 'L+', piece: Piece.BPLance },
    { symbol: 'N+', piece: Piece.BPKnight },
    { symbol: 'S+', piece: Piece.BPSilver },
    { symbol: 'B+', piece: Piece.BHorse },
    { symbol: 'R+', piece: Piece.BDragon },
    { symbol: 'p+', piece: Piece.WPPawn },
    { symbol: 'l+', piece: Piece.WPLance },
    { symbol: 'n+', piece: Piece.WPKnight },
    { symbol: 's+', piece: Piece.WPSilver },
    { symbol: 'b+', piece: Piece.WHorse },
    { symbol: 'r+', piece: Piece.WDragon },
]

export const FILE_MAP: string[] = "123456789".split("")
export const RANK_MAP: string[] = "abcdefghi".split("")

export const findPiece = (c: string): Piece | undefined => PIECE_MAP.find(v => v.symbol === c)?.piece
export const findSymbol = (p: Piece): string | undefined => PIECE_MAP.find(v => v.piece.eq(p))?.symbol
