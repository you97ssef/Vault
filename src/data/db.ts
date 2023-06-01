import type { Secret } from "@/models/secret";
import Dexie, { type Table } from "dexie";

export class Schema extends Dexie {
    secrets!: Table<any>;

    constructor(dbName: string, version: number) {
        super(dbName);
        this.version(version).stores({
            secrets: "++id,topic,values,tags",
        });
    }
}
