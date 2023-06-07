import type { Secret } from "@/models/secret";
import type { Schema } from "./db";

export class SecretRepo {
    constructor(private db: Schema) {}

    async get(secretId: any) {
        try {
            let data = await this.db.secrets.get(Number(secretId));

            return {
                id: data.id,
                topic: data.topic,
                tags: JSON.parse(data.tags),
                values: JSON.parse(data.values),
            } as Secret;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    async save(secret: Secret) {
        let data = {
            topic: secret.topic,
            tags: JSON.stringify(secret.tags),
            values: JSON.stringify(secret.values),
        } as any;

        try {
            if (secret.id != null) data.id = secret.id;
            await this.db.secrets.put(data);
        } catch (error) {
            console.error(error);
        }
    }

    async delete(secretId: any) {
        try {
            await this.db.secrets.delete(Number(secretId));
        } catch (error) {
            console.error(error);
        }
    }

    async all() {
        try {
            return (await this.db.secrets.toArray()).map((s) => {
                return {
                    id: s.id,
                    topic: s.topic,
                    tags: JSON.parse(s.tags),
                    values: JSON.parse(s.values),
                } as Secret;
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
