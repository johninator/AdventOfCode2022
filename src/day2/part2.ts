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

const mapSecondColumn: Map<string, Result> = new Map([
    ["X", Result.LOSE],
    ["Y", Result.DRAW],
    ["Z", Result.WIN]
]);

const mapBasicScore: Map<Hand, number> = new Map([
    [Hand.ROCK, 1],
    [Hand.PAPER, 2],
    [Hand.SCISSORS, 3]
]);

const mapResultScore: Map<Result, number> = new Map([
    [Result.LOSE, 0],
    [Result.DRAW, 3],
    [Result.WIN, 6]
]);

console.log(computeResult(stringPairs));


function computeResult(stringPairs: StringPairs): number {
    return stringPairs.reduce((scoreSum, value) => {
        const score = computeScore(mapFirstColumn.get(value[0]), mapSecondColumn.get(value[1]));
        return scoreSum + score;
    }, 0);
}

function computeScore(handOpponent?: Hand, result?: Result): number {
    if (handOpponent === undefined || result === undefined) {
        return 0;
    }
    const handMy = computeHand(handOpponent, result);
    const scoreBasic = mapBasicScore.get(handMy) || 0;
    const scoreResult = mapResultScore.get(result) || 0;
    return scoreBasic + scoreResult;
}

function computeHand(handOpponent: Hand, result: Result): Hand {
    if (result === Result.WIN) {
        if (handOpponent === Hand.ROCK) { return Hand.PAPER; }
        if (handOpponent === Hand.PAPER) { return Hand.SCISSORS; }
        if (handOpponent === Hand.SCISSORS) { return Hand.ROCK; }
    }
    if (result === Result.LOSE) {
        if (handOpponent === Hand.ROCK) { return Hand.SCISSORS; }
        if (handOpponent === Hand.PAPER) { return Hand.ROCK; }
        if (handOpponent === Hand.SCISSORS) { return Hand.PAPER; }
    }
    return handOpponent;
}

