const CheckForAccesToAddUser = () => {
    const role = sessionStorage.getItem('role');
    const allowedRoles = ['1', '2'];

    if(allowedRoles.includes(role)){
        return <li><a href='/adduser'>Gebruiker toevoegen</a></li>;
    }
}

export default CheckForAccesToAddUser;