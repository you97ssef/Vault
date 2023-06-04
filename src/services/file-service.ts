import { AES, enc } from "crypto-ts";

export class FileService {
    constructor() {}

    async encrypt(file: File, code: string) {
        let encryptedData = {
            file: AES.encrypt(await file.text(), code).toString(),
            vault: "encrypted by vault application"
        }

        let encrypted = new Blob([btoa(JSON.stringify(encryptedData))], {
            type: "charset=utf-8",
        });

        let a = document.createElement("a"),
            url = URL.createObjectURL(encrypted);
        a.href = url;
        a.download = file.name + ".vcrypt";
        document.body.appendChild(a);

        a.click();

        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    async decrypt(file: File, code: string) {
        let data = JSON.parse(atob(await file.text()));

        if (data.vault != "encrypted by vault application" && file.name.substring(file.name.length - 7) != ".vcrypt") {
            alert("Invalid file")
        } else {
            let decrypted = new Blob([AES.decrypt(data.file, code).toString(enc.Utf8)], {
                type: "charset=utf-8",
            });

            let a = document.createElement("a"),
            url = URL.createObjectURL(decrypted);
            a.href = url;
            a.download = file.name.slice(0, -7);
            document.body.appendChild(a);

            a.click();

            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
}
