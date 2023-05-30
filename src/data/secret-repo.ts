import type { Secret } from "@/models/secret";

export class SecretRepo {
    get(secretId: any) {
        let secret = localStorage.getItem(
            `secret-${secretId}`
        );

        if (secret) return JSON.parse(secret);

        return null;
    }

    save(secret: Secret) {
        if (!secret.id) secret.id = this.newId();
        localStorage.setItem(
            `secret-${secret.id}`,
            JSON.stringify(secret)
        );
    }

    delete(secretId: any) {
        localStorage.removeItem(`secret-${secretId}`);
    }

    all() {
        let secrets = [];

        for (let i = 1; i <= this.countSecrets(); i++) {
            let secret = this.get(i);

            if (secret) secrets.push(secret);
        }

        return secrets;
    }

    private countSecrets(): number {
        let secrets = localStorage.getItem("secrets-count");

        if (!secrets) {
            localStorage.setItem(
                "secrets-count",
                JSON.stringify(0)
            );

            return 0;
        }

        return parseInt(JSON.parse(secrets));
    }

    private newId(): number {
        let secrets = JSON.parse(
            localStorage.getItem("secrets-count")!
        );
        secrets = parseInt(secrets) + 1;
        localStorage.setItem(
            "secrets-count",
            JSON.stringify(secrets)
        );
        return secrets;
    }
}
