import {Category} from "../model/Category";

export default new class WordPracticeApi {

    getCategories(): Array<Category> {
        return [
            {
                id: '1',
                name: 'German A1',
                pictureUrl: 'https://static.vecteezy.com/system/resources/previews/003/331/310/original/germany-map-silhouette-with-flag-on-white-background-free-vector.jpg',
                wordCount: 10
            },
            {
                id: '2',
                name: 'Family',
                pictureUrl: 'https://clipart-library.com/images_k/family-clipart-transparent-background/family-clipart-transparent-background-6.png',
                wordCount: 32
            },
            {
                id: '3',
                name: 'Food',
                pictureUrl: 'https://w7.pngwing.com/pngs/968/945/png-transparent-detoxification-graphy-healthy-diet-healthy-food-natural-foods-food-photography.png',
                wordCount: 18
            },
        ]
    }

}