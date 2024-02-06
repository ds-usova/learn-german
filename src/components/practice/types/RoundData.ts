export interface AnswerSubmitData {
    correct: boolean
}

export class PracticeResult {
    correctAnswerCount: number
    from: number

    constructor(correctAnswerCount: number, from: number) {
        this.correctAnswerCount = correctAnswerCount;
        this.from = from;
    }
}

export enum State {
    PENDING,
    CORRECT,
    WRONG,
    SKIP
}
