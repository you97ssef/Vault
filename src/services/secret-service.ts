import type { Config } from "@/models/config";
import { AES, enc } from 'crypto-ts';

export class SecretService {
    private config: Config;

    constructor(config: Config){
        this.config = config;
    }

    encrypt(secret: string){
        return AES.encrypt(secret, this.config.pass).toString();
    }

    decrypt(encrypted: string){
        return AES.decrypt(encrypted, this.config.pass).toString(enc.Utf8);
    }
}