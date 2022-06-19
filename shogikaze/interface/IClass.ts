export interface IEqualable {
    eq(other: IEqualable): boolean
}

export interface ICloneable {
    clone(): ICloneable
}
