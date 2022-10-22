import type { Category } from "@/models/category";

export class CategoryService {
    get(categoryId: number) {
        let category = localStorage.getItem("category-" + categoryId);

        if (category) return JSON.parse(category);

        return null;
    }

    new(category: Category) {
        let count = JSON.parse(localStorage.getItem("count")!);

        category.id = count.categories = parseInt(count.categories) + 1;
        localStorage.setItem("count", JSON.stringify(count));

        localStorage.setItem("category-" + category.id, JSON.stringify(category));
    }

    update(categoryId: number, newCategory: Category) {
        let category = this.get(categoryId);

        if (category) {
            newCategory.id = categoryId;

            localStorage.setItem("category-" + category.id, JSON.stringify(category));
        }
    }

    delete(categoryId: number) {
        let category = this.get(categoryId);

        if (category) localStorage.removeItem("category-" + category.id);
    }

    all() {
        let categories = [];

        for (let i = 1; i <= this.countCategories(); i++) {
            let category = this.get(i);

            if (category) categories.push(category);
        }

        return categories;
    }

    private countCategories(): number
    {
        let countString = localStorage.getItem("count")

        if(!countString) {
            localStorage.setItem("count", JSON.stringify({
                categories:0,
                secrets:0
            }))

            return 0
        }
        else return JSON.parse(countString).categories;
    }
}
