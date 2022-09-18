import type { Category } from "@/models/category";
import type { Config } from "@/models/config";
import type { Secret } from "@/models/secret";
import { SecretService } from "@/services/secret-service";

const config: Config = { pass: "Secret", pin: "0000" };
let categories: Category[] = [];

const secretService: SecretService = new SecretService(config);

for (let i = 0; i < 10; i++) {
    let secrets: Secret[] = [];
    for (let j = i * 100; j < (i + 1) * 100; j++) {
        secrets.push({
            id: j,
            secret: secretService.encrypt("secret-" + j),
            topic: "topic-" + j,
            username: secretService.encrypt("username-" + j),
        });
    }

    categories.push({
        id: i,
        name: "category-"+i,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac purus non odio vehicula euismod. Nam sed purus eu neque dictum molestie a euismod turpis.-" + i,
        secrets: secrets,
    });
}

export const db = {
    config: config,
    categories: categories,
};
