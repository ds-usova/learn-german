import {
    FlashcardsQuestion,
    InputQuestion,
    MultipleChoiceQuestion,
    Practice,
    PracticeRound,
    PracticeType,
    TypingQuestion
} from "../model/Practice";
import {Category} from "../model/Category";
import wordApi from "./WordApi";
import {PracticeResult} from "../components/practice/types/RoundData";

export default new class WordPracticeApi {

    getCategoryBasedPracticeList(): Array<Practice> {
        return [this.articlePractice(), this.flashcardPractice(), this.presentSimplePractice(), this.typingPractice()]
    }

    getGeneralPracticeList(): Array<Practice> {
        return [this.numberPractice()]
    }

    getPracticeRound(id: string, category: Category): PracticeRound {
        if (id === '1') {
            return {practice: this.articlePractice(), questions: this.articleQuestions(category)}
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

        if (id === '5') {
            return {practice: this.numberPractice(), questions: this.numberQuestions()}
        }
    }

    submitPracticeResult(practiceResult: PracticeResult) {
        console.log('submitting practice result...')
    }

    // article
    private articlePractice(): Practice {
        return {
            id: '1',
            name: 'Articles',
            practiceType: PracticeType.MULTIPLE_CHOICE
        }
    }

    private articleQuestions(category?: Category): Array<MultipleChoiceQuestion> {
        const allWords = wordApi.getWordsBy({categoryId: category?.id})
        const allOptions = ['der', 'die', 'das']
        return allWords.map(it => ({
            text: it.value.split(" ")[1],
            options: allOptions,
            correctAnswer: it.value.split(" ")[0]
        }))
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

    // numbers
    private numberPractice(): Practice {
        return {
            id: '5',
            name: 'Numbers',
            practiceType: PracticeType.MULTIPLE_INPUT
        }
    }

    private numberQuestions(): Array<InputQuestion> {
        return [
            {
                text: '0 - 10', questions: [
                    {question: '1', answer: 'eins'},
                    {question: '4', answer: 'vier'},
                    {question: '7', answer: 'sieben'},
                ]
            },
            {
                text: '11 - 99', questions: [
                    {question: '11', answer: 'elf'},
                    {question: '20', answer: 'zwanzig'},
                    {question: '14', answer: 'vierzehn'},
                ]
            },
            {
                text: '> 100', questions: [
                    {question: '200', answer: 'zweihundert'},
                    {question: '1001', answer: 'eintausendeins'},
                    {question: '3000', answer: 'dreitausend'},
                ]
            },
        ]
    }

}