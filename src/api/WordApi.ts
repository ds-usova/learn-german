import {Word} from "../model/Word";

export default new class WordPracticeApi {

    getWordsByCategory(id: string): Array<Word> {
        return [
            {id: '1', word: 'der Tisch', translation: 'table', example: 'todo'},
            {id: '2', word: 'die Tür', translation: 'door', example: 'todo'},
            {id: '3', word: 'das Buch', translation: 'book', example: 'todo'},
        ]
    }

}