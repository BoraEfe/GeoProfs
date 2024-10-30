import cryptoJs from "crypto-js";
import { hashPasswordWithSalt } from "./HashPassword";

describe('hashPasswordWithSalt',() =>{
    const originalEnv = process.env;

    beforeAll(() =>{
        process.env = {...originalEnv, VITE_saltedWord: 'saltedWord'};
    })

    afterAll (() =>{
        process.env = originalEnv;
    })

    test ('hashes password with salt correctly',() => {
        const password = 'password';
        const result = hashPasswordWithSalt(password);

        const saltedPassword = 'passsaltedWordword';
        const expectedHash = cryptoJs.SHA256(saltedPassword).toString();

        expect(result.hashedPassword).toBe(expectedHash);
    })

    test('throw error if no salted word founded', () => {
        process.env.VITE_saltedWord = '';
        expect(() => hashPasswordWithSalt('password')).toThrow('No salted world found');
    })

});