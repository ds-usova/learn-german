import {FlashcardsQuestion, MultipleChoiceQuestion, Practice, PracticeRound, PracticeType} from "../model/Practice";

export default new class WordPracticeApi {

    getPracticeList(): Array<Practice> {
        return [this.articlePractice(), this.flashcardPractice()]
    }

    getPracticeRound(id: string): PracticeRound {
        if (id === '1') {
            return {practice: this.articlePractice(), questions: this.articleQuestions()}
        }

        if (id === '2') {
            return {practice: this.flashcardPractice(), questions: this.flashcardQuestions()}
        }
    }

    // article
    private articlePractice(): Practice {
        return {
            id: '1',
            name: 'Articles',
            practiceType: PracticeType.MULTIPLE_CHOICE
        }
    }

    private articleQuestions(): Array<MultipleChoiceQuestion> {
        return [
            {text: 'Tisch', options: ['der', 'die', 'das'], correctAnswer: 'der'},
            {text: 'Tür', options: ['der', 'die', 'das'], correctAnswer: 'die'},
            {text: 'Buch', options: ['der', 'die', 'das'], correctAnswer: 'das'},
        ]
    }

    // flashcard
    private flashcardPractice(): Practice {
        return {
            id: '2',
            name: 'Flashcards',
            practiceType: PracticeType.FLASHCARDS
        }
    }

    private flashcardQuestions(): Array<FlashcardsQuestion> {
        return [
            {text: 'der Tisch', correctAnswer: 'table'},
            {text: 'die Tür', correctAnswer: 'door'},
            {text: 'das Buch', correctAnswer: 'book'},
        ]
    }

}