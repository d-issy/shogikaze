import { IEqualable } from "../interface/IClass"

export default class Square implements IEqualable {
    private constructor(public v: number) { }

    public eq(other: Square): boolean { return this.v === other.v }

    public static from(file: number, rank: number): Square {
        return new Square(file * 9 + rank)
    }

    public file(): number { return Math.floor(this.v / 9) }
    public rank(): number { return this.v % 9 }

    public static readonly SQ11 = new Square(0)
    public static readonly SQ12 = new Square(1)
    public static readonly SQ13 = new Square(2)
    public static readonly SQ14 = new Square(3)
    public static readonly SQ15 = new Square(4)
    public static readonly SQ16 = new Square(5)
    public static readonly SQ17 = new Square(6)
    public static readonly SQ18 = new Square(7)
    public static readonly SQ19 = new Square(8)
    public static readonly SQ21 = new Square(9)
    public static readonly SQ22 = new Square(10)
    public static readonly SQ23 = new Square(11)
    public static readonly SQ24 = new Square(12)
    public static readonly SQ25 = new Square(13)
    public static readonly SQ26 = new Square(14)
    public static readonly SQ27 = new Square(15)
    public static readonly SQ28 = new Square(16)
    public static readonly SQ29 = new Square(17)
    public static readonly SQ31 = new Square(18)
    public static readonly SQ32 = new Square(19)
    public static readonly SQ33 = new Square(20)
    public static readonly SQ34 = new Square(21)
    public static readonly SQ35 = new Square(22)
    public static readonly SQ36 = new Square(23)
    public static readonly SQ37 = new Square(24)
    public static readonly SQ38 = new Square(25)
    public static readonly SQ39 = new Square(26)
    public static readonly SQ41 = new Square(27)
    public static readonly SQ42 = new Square(28)
    public static readonly SQ43 = new Square(29)
    public static readonly SQ44 = new Square(30)
    public static readonly SQ45 = new Square(31)
    public static readonly SQ46 = new Square(32)
    public static readonly SQ47 = new Square(33)
    public static readonly SQ48 = new Square(34)
    public static readonly SQ49 = new Square(35)
    public static readonly SQ51 = new Square(36)
    public static readonly SQ52 = new Square(37)
    public static readonly SQ53 = new Square(38)
    public static readonly SQ54 = new Square(39)
    public static readonly SQ55 = new Square(40)
    public static readonly SQ56 = new Square(41)
    public static readonly SQ57 = new Square(42)
    public static readonly SQ58 = new Square(43)
    public static readonly SQ59 = new Square(44)
    public static readonly SQ61 = new Square(45)
    public static readonly SQ62 = new Square(46)
    public static readonly SQ63 = new Square(47)
    public static readonly SQ64 = new Square(48)
    public static readonly SQ65 = new Square(49)
    public static readonly SQ66 = new Square(50)
    public static readonly SQ67 = new Square(51)
    public static readonly SQ68 = new Square(52)
    public static readonly SQ69 = new Square(53)
    public static readonly SQ71 = new Square(54)
    public static readonly SQ72 = new Square(55)
    public static readonly SQ73 = new Square(56)
    public static readonly SQ74 = new Square(57)
    public static readonly SQ75 = new Square(58)
    public static readonly SQ76 = new Square(59)
    public static readonly SQ77 = new Square(60)
    public static readonly SQ78 = new Square(61)
    public static readonly SQ79 = new Square(62)
    public static readonly SQ81 = new Square(63)
    public static readonly SQ82 = new Square(64)
    public static readonly SQ83 = new Square(65)
    public static readonly SQ84 = new Square(66)
    public static readonly SQ85 = new Square(67)
    public static readonly SQ86 = new Square(68)
    public static readonly SQ87 = new Square(69)
    public static readonly SQ88 = new Square(70)
    public static readonly SQ89 = new Square(71)
    public static readonly SQ91 = new Square(72)
    public static readonly SQ92 = new Square(73)
    public static readonly SQ93 = new Square(74)
    public static readonly SQ94 = new Square(75)
    public static readonly SQ95 = new Square(76)
    public static readonly SQ96 = new Square(77)
    public static readonly SQ97 = new Square(78)
    public static readonly SQ98 = new Square(79)
    public static readonly SQ99 = new Square(80)

    public static readonly EMPTY = new Square(81)
}