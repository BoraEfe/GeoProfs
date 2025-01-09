import {hashPasswordWithSalt} from './HashPassword';

describe('hashPasswordWithSalt', () => {
    test('hashes password with salt correctly', () => {
        const password = 'password';
        const result = hashPasswordWithSalt(password);
        const expectedResult = "a08a466f39b5acbdda364ed365783a6131924a745ca96efd0e6d59e87983b9b1";

        console.log("resultaat: ", result.hashedPassword);
        console.log("verwachting: ",expectedResult);

        expect(result.hashedPassword).toBe(expectedResult);
    });
});
