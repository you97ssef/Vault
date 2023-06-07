import type { Schema } from "@/data/db";
import { importInto, exportDB } from "dexie-export-import";

export class DataService {
    constructor(private db: Schema) {}

    async export() {
        let dbBlob = await exportDB(this.db, {
            prettyJson: true
        })

        let data = {
            localStorage: localStorage,
            db: JSON.parse(await dbBlob.text()),
        };

        let file = new Blob([btoa(JSON.stringify(data))], {
            type: "charset=utf-8",
        });

        let a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = "vault.data";
        document.body.appendChild(a);

        a.click();

        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    import(file: any) {
        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = async () => {
            if (typeof reader.result == "string") {
                let data = JSON.parse(atob(reader.result));
                
                Object.keys(data.localStorage).forEach(function (k: any) {
                    localStorage.setItem(k, data.localStorage[k]);
                });

                await importInto(this.db, new Blob([JSON.stringify(data.db)], {
                    type: "charset=utf-8",
                }));
            }
        };

        reader.onloadend = () => {
            location.reload();
        };
    }

    async clear() {
        await this.db.delete()
        localStorage.clear();
        
        location.reload();
    }
}
