import type { Secret } from "@/models/secret";

export class SecretRepo {
    get(categoryId: any, secretId: any) {
        let secret = localStorage.getItem(`secret-${secretId}-category-${categoryId}`);

        if (secret) return JSON.parse(secret);

        return null;
    }

    save(categoryId: any, secret: Secret) {
        if(!secret.id) secret.id = this.newId(categoryId);
        localStorage.setItem(`secret-${secret.id}-category-${categoryId}`, JSON.stringify(secret));
    }

    delete(categoryId: any, secretId: any) {
        localStorage.removeItem(`secret-${secretId}-category-${categoryId}`);
    }

    all(categoryId: any) {
        let secrets = [];

        for (let i = 1; i <= this.countSecrets(categoryId); i++) {
            let secret = this.get(categoryId, i);

            if (secret) secrets.push(secret);
        }

        return secrets;
    }

    private countSecrets(categoryId: any): number
    {
        let category = localStorage.getItem("category-" + categoryId)!;

        return JSON.parse(category).secrets;
    }

    private newId(categoryId: any): number {
        let category = JSON.parse(localStorage.getItem("category-" + categoryId)!)
        category.secrets ++;
        localStorage.setItem("category-" + categoryId, JSON.stringify(category))
        return category.secrets;
    }
}
