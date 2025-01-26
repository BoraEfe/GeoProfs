import React from "react";

const CheckForAccesToLeavePage = () => {
    var role = sessionStorage.getItem('role');
    const allowedRoles = ['1', '2', '3'];

    if (allowedRoles.includes(role)) {
        return <li><a href='/admin'>Verlofbeheer</a></li>;
    } 
};

export default CheckForAccesToLeavePage;