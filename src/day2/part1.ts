import {StringPairsReader, StringPairs} from '../reader/reader';

const reader = new StringPairsReader('../inputs/input2.txt');
const stringPairs: StringPairs = reader.read();

enum Hand {
    ROCK, 
    PAPER,
    SCISSORS
}

enum Result {
    WIN,
    LOSE,
    DRAW
}

const mapFirstColumn: Map<string, Hand> = new Map([
    ["A", Hand.ROCK],
    ["B", Hand.PAPER],
    ["C", Hand.SCISSORS]
]);

const mapSecondColumn: Map<string, Hand> = new Map([
    ["X", Hand.ROCK],
    ["Y", Hand.PAPER],
    ["Z", Hand.SCISSORS]
]);


const mapBasicScore: Map<Hand, number> = new Map([
    [Hand.ROCK, 1],
    [Hand.PAPER, 2],
    [Hand.SCISSORS, 3]
]);

console.log(computeResult(stringPairs));


function computeResult(stringPairs: StringPairs): number {
    return stringPairs.reduce((scoreSum, value) => {
        const score = computeScore(mapFirstColumn.get(value[0]), mapSecondColumn.get(value[1]));
        return scoreSum + score;
    }, 0);
}

function computeScore(handOpponent?: Hand, handMy?: Hand): number {
    if (handOpponent === undefined || handMy === undefined) {
        return 0;
    }

    const score = mapBasicScore.get(handMy) || 0;

    if ( computeMatch(handMy, handOpponent) === Result.WIN) {
        return score + 6;
    }

    if ( computeMatch(handMy, handOpponent) === Result.DRAW) {
        return score + 3;
    }

    return score;
}

function computeMatch(hand1: Hand, hand2: Hand): Result {
    if (hand1 === hand2) {
        return Result.DRAW;
    }
    if ( hand1 === Hand.ROCK && hand2 === Hand.SCISSORS ||
        hand1 === Hand.PAPER && hand2 === Hand.ROCK ||
        hand1 === Hand.SCISSORS && hand2 === Hand.PAPER) {
            return Result.WIN;
    }
    return Result.LOSE;
}

