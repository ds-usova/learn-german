import {Category} from "./Category";

export interface Word {
    id: string
    category?: Category
    value: string
    translation: string
    example: string
    leoLink: string
}
