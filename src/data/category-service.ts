import type { Category } from "@/models/category";

export class CategoryService {
    get(categoryId: number) {
        let category = localStorage.getItem("category-" + categoryId);

        if (category) return JSON.parse(category);

        return null;
    }

    save(category: Category) {
        if(!category.id) category.id = this.newId();
        localStorage.setItem("category-" + category.id, JSON.stringify(category));
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

    private newId(): number {
        let count = JSON.parse(localStorage.getItem("count")!)
        count.categories ++;
        localStorage.setItem("count", JSON.stringify(count))
        return count.categories;
    }
}
