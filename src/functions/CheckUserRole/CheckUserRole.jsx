const CheckUserRole = () => {

    var department = sessionStorage.getItem('department');
    var role = sessionStorage.getItem('role');
    var jobFunction = sessionStorage.getItem('function');
    console.log(role);  
    if (role === '1'){
        return <div>{jobFunction + " " + department}</div>
    }
    else if (role === '2'){
        return <div>{jobFunction + " " + department}</div>
    }
    else if (role === '3'){
        return <div>{jobFunction + " " + department }</div>
    }
    else if (role === '4'){
        return <div>{jobFunction + " " + department}</div>
    }
    else if (role === null){
        return <div>error</div>
    }
}

export default CheckUserRole;