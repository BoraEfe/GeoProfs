import Login from './Login';

describe('Login', () => {

    const user = {
        username: 'test',
        firstname: 'test',
        lastname: 'test',
        vakantiedagen: 0,
        email: 'test',
        role: 'test',
        uuid: 'test',
        isLoggedIn: false,
    }
    test('check if user doensnt have password', () => {
        expect(Login(user.firstname)).not.toBeNull(); 
    });
});
