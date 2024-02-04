export interface Practice {
    id: string
    name: string
    practiceType: PracticeType
}

export interface PracticeRound {
    practice: Practice
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