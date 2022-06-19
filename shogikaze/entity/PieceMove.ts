import _ from "lodash"


const right = -9
const up    = -1
const down  = 1
const left  = 9

const mHV = [right, up, down, left]
const mDG = [up + right, up + left, down + right, down + left]

const mBPawn   = [up]
const mBKnight = [2 * up + right, 2 * up + left]
const mBSilver = _.union(mDG, mBPawn)
const mBGold   = [-10, -9, -1, 1, 8, 9]
const mWPawn   = [9]
const mWKnight = [-11, 7]
const mWSilver = [-10, -8, -1, 8, 10]
const mWGold   = [-10, -9, -1, 1, 8, 9]

const mKing = _.union(mBSilver, mBGold)
