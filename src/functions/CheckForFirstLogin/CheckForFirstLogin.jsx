const CheckForFirstLogin = (user) => {
    console.log('tijdelijkWachtwoord waarde:', user.tijdelijkWachtwoord);  // Debug log

    // Pas de conditie aan om 0 te behandelen als een geldige waarde voor de redirect
    if (user.tijdelijkWachtwoord === "" || user.tijdelijkWachtwoord === null || user.tijdelijkWachtwoord === undefined) {
        console.log('niks aan de hand');
        return;
    } else {
        console.log("Uw wachtwoord is nog niet veranderd. Verander uw wachtwoord nu!");
        window.location.href = '/ChangeTemporaryPassword';
        return;
    }
};

export default CheckForFirstLogin;
