import type { Secret } from "./Secret";

export interface Category {
    id: number;
    name: string;
    description: string | null;
    secrets: Secret[];
}
