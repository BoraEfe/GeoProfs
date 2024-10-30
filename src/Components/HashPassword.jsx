import CryptoJS from 'crypto-js';

export const hashPasswordWithSalt = (password) => {


    // const saltedWord = import.meta.env.VITE_saltedWord || "";
    const saltedWord = "LindeRebers";
    if (saltedWord === "") {
        throw new Error("No salted word found");
    }

    console.log(saltedWord)

    const saltedPassword = password.slice(0, Math.floor(password.length / 2)) + saltedWord + password.slice(Math.floor(password.length / 2));

    console.log(saltedPassword)

    const hashedAndSaltedPassword = CryptoJS.SHA256(saltedPassword) .toString();

    return {
        hashedPassword: hashedAndSaltedPassword,
    }
}