import {
    FlashcardsQuestion,
    InputQuestion,
    MultipleChoiceQuestion,
    Practice,
    PracticeRound,
    PracticeType, TypingQuestion
} from "../model/Practice";

export default new class WordPracticeApi {

    getPracticeList(): Array<Practice> {
        return [this.articlePractice(), this.flashcardPractice(), this.presentSimplePractice(), this.typingPractice()]
    }

    getPracticeRound(id: string): PracticeRound {
        if (id === '1') {
            return {practice: this.articlePractice(), questions: this.articleQuestions()}
        }

        if (id === '2') {
            return {practice: this.flashcardPractice(), questions: this.flashcardQuestions()}
        }

        if (id === '3') {
            return {practice: this.presentSimplePractice(), questions: this.presentSimpleQuestions()}
        }

        if (id === '4') {
            return {practice: this.typingPractice(), questions: this.typingQuestion()}
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

    // present simple
    private presentSimplePractice(): Practice {
        return {
            id: '3',
            name: 'Present Simple',
            practiceType: PracticeType.MULTIPLE_INPUT
        }
    }

    private presentSimpleQuestions(): Array<InputQuestion> {
        return [
            {
                text: 'Sind', questions: [
                    {question: 'ich', answer: 'bin'},
                    {question: 'du', answer: 'bist'},
                    {question: 'er / es / sie', answer: 'ist'},
                    {question: 'wir', answer: 'sind'},
                    {question: 'ihr', answer: 'seid'},
                    {question: 'sie / Sie', answer: 'sind'},
                ]
            },
            {
                text: 'Haben', questions: [
                    {question: 'ich', answer: 'habe'},
                    {question: 'du', answer: 'hast'},
                    {question: 'er / es / sie', answer: 'hat'},
                    {question: 'wir', answer: 'haben'},
                    {question: 'ihr', answer: 'habt'},
                    {question: 'sie / Sie', answer: 'haben'},
                ]
            },
            {
                text: 'Möchten', questions: [
                    {question: 'ich', answer: 'möchte'},
                    {question: 'du', answer: 'möchtest'},
                    {question: 'er / es / sie', answer: 'möchte'},
                    {question: 'wir', answer: 'möchten'},
                    {question: 'ihr', answer: 'möchtet'},
                    {question: 'sie / Sie', answer: 'möchten'},
                ]
            },
        ]
    }

    // typing
    private typingPractice(): Practice {
        return {
            id: '4',
            name: 'Typing practice',
            practiceType: PracticeType.TYPING
        }
    }

    private typingQuestion(): Array<TypingQuestion> {
        return [
            {
                translation: 'table',
                answer: 'der Tisch'
            },
            {
                translation: 'door',
                answer: 'die Tür'
            },
            {
                translation: 'book',
                answer: 'das Buch'
            },
            {
                translation: 'to go',
                answer: 'gehen'
            },
        ]
    }

}