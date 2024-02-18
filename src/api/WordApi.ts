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
            words = words.filter((it) => it.category?.id == wordFilter?.categoryId)
        }

        return words
    }

    private all(): Array<Word> {
        return [
            {
                id: '1',
                category: categoryApi.getCategories()[0],
                value: 'der Tisch',
                translation: 'table',
                example: 'todo',
                leoLink: 'https://dict.leo.org/englisch-deutsch/der%20Tisch',
            },
            {
                id: '2',
                category: categoryApi.getCategories()[0],
                value: 'die Tür',
                translation: 'door',
                example: 'todo',
                leoLink: 'https://dict.leo.org/englisch-deutsch/die%20Tür',
            },
            {
                id: '3',
                category: categoryApi.getCategories()[0],
                value: 'das Buch',
                translation: 'book',
                example: 'todo',
                leoLink: 'https://dict.leo.org/englisch-deutsch/das%20Buch',
            },
            {
                id: '4',
                category: categoryApi.getCategories()[1],
                value: 'die Schwester',
                translation: 'sister',
                example: 'todo',
                leoLink: 'https://dict.leo.org/englisch-deutsch/die%20Schwester',
            },
        ]
    }

}

interface WordFilter {
    categoryId?: string
    word?: string
}