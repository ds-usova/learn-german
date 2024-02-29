import {Category} from "../model/Category";

export default new class WordPracticeApi {

    create(category: Category): Category {
        console.log('creating category...')
        category.id = '' + Math.floor(Math.random() * 1000)
        return category
    }

    update(category: Category): Category {
        console.log('updating category...')
        return category
    }

    delete(category: Category) {
        console.log('deleting category...')
    }

    getCategoryById(id: string): Category | undefined {
        return this.getAllCategories().find(it => it.id === id)
    }

    getUserCategories(): Array<Category> {
        return this.all()
    }

    getAllCategories(): Array<Category> {
        const defaultCategory = {
            id: '0',
            name: 'No category',
            pictureUrl: 'https://i.pinimg.com/736x/46/1a/23/461a23cdae520158fc6b48d6a9397bcc.jpg',
            wordCount: 3
        }
        const categories = this.getUserCategories()
        categories.unshift(defaultCategory)
        return categories
    }

    private all(): Array<Category> {
        return [
            {
                id: '1',
                name: 'German A1',
                pictureUrl: 'https://static.vecteezy.com/system/resources/previews/003/331/310/original/germany-map-silhouette-with-flag-on-white-background-free-vector.jpg',
                wordCount: 3
            },
            {
                id: '2',
                name: 'Family',
                pictureUrl: 'https://clipart-library.com/images_k/family-clipart-transparent-background/family-clipart-transparent-background-6.png',
                wordCount: 1
            },
            {
                id: '3',
                name: 'Food',
                pictureUrl: 'https://w7.pngwing.com/pngs/968/945/png-transparent-detoxification-graphy-healthy-diet-healthy-food-natural-foods-food-photography.png',
                wordCount: 0
            },
        ]
    }

}