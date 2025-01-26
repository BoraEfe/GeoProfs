import React from "react";

const CheckUserRole = () => {

    var department = sessionStorage.getItem('department');
    var role = sessionStorage.getItem('role');
    var jobFunction = sessionStorage.getItem('function');
    console.log(role);  
    if(role === null){
        return<div>error</div>
    }
    else{
        return<div>{jobFunction + " " + department}</div>
    }
}

export default CheckUserRole;