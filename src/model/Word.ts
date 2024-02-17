import {Category} from "./Category";

export interface Word {
    id: string
    categories: Array<Category>
    value: string
    translation: string
    example: string
    leoLink: string
}
