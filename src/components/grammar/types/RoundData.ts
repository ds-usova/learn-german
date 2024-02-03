export interface RoundData {
    practiceType: PracticeType
    questions: Array<Question>
}

export interface Question {

}

export interface MultipleChoiceQuestion extends Question {
    text: string
    options: Array<String>
    correctAnswer: string
}

export interface FlashcardsQuestion extends Question {
    text: string
    correctAnswer: string
}

export enum PracticeType {
    MULTIPLE_CHOICE,
    FLASHCARDS
}

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
    WRONG
}
