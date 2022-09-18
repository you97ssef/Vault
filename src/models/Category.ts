import type { Secret } from "./secret";

export interface Category {
    id: number;
    name: string;
    description: string | null;
    secrets: Secret[];
}
