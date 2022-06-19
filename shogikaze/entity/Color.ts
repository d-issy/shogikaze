import { IEqualable } from "../interface/IClass"

export default class Color implements IEqualable {
    private constructor(private v: number) { }
    public eq(other: Color) { return this.v === other.v }

    public static readonly BLACK = new Color(0)
    public static readonly WHITE = new Color(1)
    public static readonly EMPTY = new Color(-1)
}
