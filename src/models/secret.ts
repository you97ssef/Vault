import type { SecretValue } from "./secret-value";

export interface Secret {
    id: number | null;
    topic: string;
    values: SecretValue[];
    tags: string[];
}
