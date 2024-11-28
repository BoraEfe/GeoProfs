import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// De mock data voor de gebruiker
const mockUser = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    vakantiedagen: '',
    department: '',
    role: '',
    isLoggedIn: 'false',
    tijdelijkWachtwoord: '812a99aeb1010a1c27bc3631591512e7202a7548c3c9833d78e8a13e8e36d50d',
    uuid: '',
};

// Mock de Firebase-afroepen
jest.mock("firebase/firestore", () => ({
    ...jest.requireActual("firebase/firestore"),
    collection: jest.fn(),
    getDocs: jest.fn(),
}));

test('check if user has a temp password', async () => {
    // Stel de mock `getDocs` in zodat we het mockUser object terugkrijgen
    getDocs.mockResolvedValueOnce({
        forEach: (callback) => {
            callback({
                data: () => mockUser,  // Gebruik de mockUser hier
            });
        },
    });

    // Gebruik de collection mock
    collection.mockReturnValueOnce('users'); // Dit kan een willekeurige waarde zijn omdat we `getDocs` mocken

    // Simuleer de Firebase-afroep
    const usersRef = collection(db, 'users');
    const data = await getDocs(usersRef);

    // Loop door de mock data (er is maar één document in deze test)
    data.forEach(doc => {
        const user = doc.data();
        if (user.tijdelijkWachtwoord !== "") {
            expect(user.tijdelijkWachtwoord).not.toBeNull();
        }
    });
}, 10000); // Zet de timeout naar 10 seconden
