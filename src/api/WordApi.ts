import {Word} from "../model/Word";
import categoryApi from "./CategoryApi";
import {Category} from "../model/Category";

export default new class WordPracticeApi {

    update(word: Word) {
        console.log('updating word...')
    }

    getWordsBy(wordFilter: WordFilter | null): Array<Word> {
        let words = this.all()
        if (wordFilter?.word) {
            words = words.filter((it) => it.value.includes(<string>wordFilter.word))
        }

        if (wordFilter?.category) {
            words = words.filter((it) => it.categories.includes(<Category>wordFilter?.category))
        }

        return words
    }

    private all(): Array<Word> {
        return [
            {
                id: '1',
                categories: categoryApi.getCategories(),
                value: 'der Tisch',
                translation: 'table',
                example: 'todo'
            },
            {
                id: '2',
                categories: categoryApi.getCategories(),
                value: 'die Tür',
                translation: 'door',
                example: 'todo'
            },
            {
                id: '3',
                categories: categoryApi.getCategories(),
                value: 'das Buch',
                translation: 'book',
                example: 'todo'
            },
        ]
    }

}

interface WordFilter {
    category?: Category
    word?: string
}