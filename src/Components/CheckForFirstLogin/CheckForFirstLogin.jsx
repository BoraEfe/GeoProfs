const CheckForFirstLogin = (user) => {
       
        if (user.tijdelijkWachtwoord === "" || user.tijdelijkWachtwoord === null || user.tijdelijkWachtwoord === undefined){ 
            console.log('niks aan de hand');
            return;
        } else {
            console.log("Uw wachtwoord is nog niet veranderd. Verander uw wachtwoord nu!");
            window.location.href = '/ChangeTemporaryPassword';
            return;
        }
    };

export default CheckForFirstLogin;

// 