export const COLOR = { Black: 0, White: 1, NB: 2 } as const
export type Color = typeof COLOR[keyof typeof COLOR]

export const ROLE = {
  Pawn:      1,
  Lance:     2,
  Knight:    3,
  Silver:    4,
  Gold:      5,
  Bishop:    6,
  Rook:      7,
  King:      8,
  ProPawn:   9,
  ProLance:  10,
  ProKnight: 11,
  ProSilver: 12,
  Horse:     14,
  Dragon:    15,

  ALL: 0, NB: 16,
} as const
export type Role = typeof ROLE[keyof typeof ROLE]

/* eslint-disable */
export const PIECE = {
  NO_PICE:     0,
  BPawn:       1, BLance:      2, BKnight:     3,
  BSilver:     4, BGold:       5,
  BBishop:     6, BRook:       7, BKing:       8,
  BProPawn:    9, BProLance:  10, BProKnight: 11, BProSilver: 12,
  BHourse:    14, BDragon:    15,
  WPawn:      17, WLance:     18, WKnight:    19,
  WSilver:    20, WGold:      21,
  WBishop:    22, WRook:      23, WKing:      24,
  WProPawn:   25, WProLance:  26, WProKnight: 27, WProSilver: 28,
  WHourse:    30, WDragon:    31,
  NB:         32,
} as const
/* eslint-enable */
export type Piece = typeof PIECE[keyof typeof PIECE]

export const FILE = { F1: 0, F2: 1, F3: 2, F4: 3, F5: 4, F6: 5, F7: 6, F8: 7, F9: 8, NB: 9 } as const
export const RANK = { R1: 0, R2: 1, R3: 2, R4: 3, R5: 4, R6: 5, R7: 6, R8: 7, R9: 8, NB: 9 } as const

export type File = typeof FILE[keyof typeof FILE]
export type Rank = typeof RANK[keyof typeof RANK]

/* eslint-disable */
export const SQUARE = {
  SQ_11:  0, SQ_12:  1, SQ_13:  2, SQ_14:  3, SQ_15:  4, SQ_16:  5, SQ_17:  6, SQ_18:  7, SQ_19:  8,
  SQ_21:  9, SQ_22: 10, SQ_23: 11, SQ_24: 12, SQ_25: 13, SQ_26: 14, SQ_27: 15, SQ_28: 16, SQ_29: 17,
  SQ_31: 18, SQ_32: 19, SQ_33: 20, SQ_34: 21, SQ_35: 22, SQ_36: 23, SQ_37: 24, SQ_38: 25, SQ_39: 26,
  SQ_41: 27, SQ_42: 28, SQ_43: 29, SQ_44: 30, SQ_45: 31, SQ_46: 32, SQ_47: 33, SQ_48: 34, SQ_49: 35,
  SQ_51: 36, SQ_52: 37, SQ_53: 38, SQ_54: 39, SQ_55: 40, SQ_56: 41, SQ_57: 42, SQ_58: 43, SQ_59: 44,
  SQ_61: 45, SQ_62: 46, SQ_63: 47, SQ_64: 48, SQ_65: 49, SQ_66: 50, SQ_67: 51, SQ_68: 52, SQ_69: 53,
  SQ_71: 54, SQ_72: 55, SQ_73: 56, SQ_74: 57, SQ_75: 58, SQ_76: 59, SQ_77: 60, SQ_78: 61, SQ_79: 62,
  SQ_81: 63, SQ_82: 64, SQ_83: 65, SQ_84: 66, SQ_85: 67, SQ_86: 68, SQ_87: 69, SQ_88: 70, SQ_89: 71,
  SQ_91: 72, SQ_92: 73, SQ_93: 74, SQ_94: 75, SQ_95: 76, SQ_96: 77, SQ_97: 78, SQ_98: 79, SQ_99: 80,
  ZERO:   0, NB:    81,
} as const
/* eslint-enable */
export type Square = typeof SQUARE[keyof typeof SQUARE]
