import type { Secret } from "./secret";

export interface Category {
    id: number | null;
    name: string;
    description: string | null;
    secrets: Secret[] | null;
}
