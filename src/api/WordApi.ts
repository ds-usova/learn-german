import {Word} from "../model/Word";
import categoryApi from "./CategoryApi";

export default new class WordPracticeApi {

    create(word: Word): Word {
        console.log('creating word...')
        word.id = '' + Math.floor(Math.random() * 1000)
        return word
    }

    update(word: Word): Word {
        console.log('updating word...')
        return word
    }

    getWordsBy(wordFilter: WordFilter | null): Array<Word> {
        let words = this.all()
        if (wordFilter?.word) {
            words = words.filter((it) => it.value.toLowerCase().includes(<string>wordFilter.word))
        }

        if (wordFilter?.categoryId) {
            words = words.filter((it) => it.categories.map(it => it.id).includes(<string>wordFilter?.categoryId))
        }

        return words
    }

    private all(): Array<Word> {
        return [
            {
                id: '1',
                categories: [categoryApi.getCategories()[0]],
                value: 'der Tisch',
                translation: 'table',
                example: 'todo'
            },
            {
                id: '2',
                categories: [categoryApi.getCategories()[0]],
                value: 'die Tür',
                translation: 'door',
                example: 'todo'
            },
            {
                id: '3',
                categories: [categoryApi.getCategories()[0]],
                value: 'das Buch',
                translation: 'book',
                example: 'todo'
            },
            {
                id: '4',
                categories: [categoryApi.getCategories()[1]],
                value: 'die Schwester',
                translation: 'sister',
                example: 'todo'
            },
        ]
    }

}

interface WordFilter {
    categoryId?: string
    word?: string
}