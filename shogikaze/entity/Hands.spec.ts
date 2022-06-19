import Hands from "./Hands";
import Piece from "./Piece";

test('empty', () => {
    const empty = Hands.empty()
    const cases = [
        Piece.BPawn, Piece.BLance, Piece.BKnight, Piece.BSilver, Piece.BGold, Piece.BHorse, Piece.BRook,
        Piece.WPawn, Piece.WLance, Piece.WKnight, Piece.WSilver, Piece.WGold, Piece.WHorse, Piece.WRook,
    ]
    cases.forEach(piece => expect(empty.count(piece)).toBe(0))
})

test('push', () => {
    const hand = Hands.empty()

    hand.push(Piece.BPawn)
    expect(hand.count(Piece.BPawn)).toBe(1)

    hand.push(Piece.BPawn, 2)
    expect(hand.count(Piece.BPawn)).toBe(3)

    hand.push(Piece.BDragon)
    expect(hand.count(Piece.BRook)).toBe(1)
})

test('pop', () => {
    const hand = Hands.empty()

    hand.push(Piece.BPawn)
    expect(hand.pop(Piece.BPawn)).toBe(Piece.BPawn)
    expect(hand.pop(Piece.BPawn)).toBe(Piece.EMPTY)
})
