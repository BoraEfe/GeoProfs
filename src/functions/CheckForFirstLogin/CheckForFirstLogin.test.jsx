import CheckForFirstLogin from './CheckForFirstLogin';

describe('CheckForFirstLogin', () => {
    beforeEach(() => {
        // Mock console.log before each test
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore the original console.log after each test
        console.log.mockRestore();
    });

    test('should log correct message when tijdelijkWachtwoord is not empty', () => {
        const user = { tijdelijkWachtwoord: 'test' };

        // Call the function
        CheckForFirstLogin(user);

        // Check if the correct message is logged
        expect(console.log).toHaveBeenCalledWith('Uw wachtwoord is nog niet veranderd. Verander uw wachtwoord nu!');
    });

    test('should log "niks aan de hand" when tijdelijkWachtwoord is empty', () => {
        const user = { tijdelijkWachtwoord: '' };

        // Call the function
        CheckForFirstLogin(user);

        // Check if the message "niks aan de hand" is logged
        expect(console.log).toHaveBeenCalledWith('niks aan de hand');
    });

    test('should log "niks aan de hand" when tijdelijkWachtwoord is null', () => {
        const user = { tijdelijkWachtwoord: null };

        // Call the function
        CheckForFirstLogin(user);

        // Check if the message "niks aan de hand" is logged
        expect(console.log).toHaveBeenCalledWith('niks aan de hand');
    });

    test('should log "niks aan de hand" when tijdelijkWachtwoord is undefined', () => {
        const user = { tijdelijkWachtwoord: undefined };

        // Call the function
        CheckForFirstLogin(user);

        // Check if the message "niks aan de hand" is logged
        expect(console.log).toHaveBeenCalledWith('niks aan de hand');
    });
});
