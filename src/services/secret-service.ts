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

    generateSecret(length: number = 14, upperCases: boolean = true, numbers: boolean = true, specialCases: boolean = false): string {
        let chars = 'abcdefghijklmnopqrstuvwxyz'
        if (upperCases) chars = chars + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (numbers) chars = chars + '0123456789'
        if (specialCases) chars = chars + '~`!@#$%^&*()-_+={}[]|:"<>,./?'

        return Array.from(crypto.getRandomValues(new Uint32Array(length)))
            .map((x) => chars[x % chars.length])
            .join('')
    }
}