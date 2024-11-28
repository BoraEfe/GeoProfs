import {hashPasswordWithSalt} from './HashPassword';
import CryptoJS from 'crypto-js';
describe('hashPasswordWithSalt', () => {
    const originalEnv = process.env;

    // beforeAll(() => {
    //    process.env = { ...originalEnv, VITE_saltedWord: 'saltedWord' };
    // });

    //afterAll(() => {
    //    process.env = originalEnv;
    //});

    test('hashes password with salt correctly', () => {
        const password = 'password';
        const result = hashPasswordWithSalt(password);

        const saltedPassword = 'passLindeRebersword';
        const expectedHash = CryptoJS.SHA256(saltedPassword).toString();

        console.log("resultaat: ", result.hashedPassword);
        console.log("verwachting: ",expectedHash);

        expect(result.hashedPassword).toBe(expectedHash);
    });
});
