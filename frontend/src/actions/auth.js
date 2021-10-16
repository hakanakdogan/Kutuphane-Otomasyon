import axios from 'axios';

//*****************LOGIN USER*****************  
export const login = (data) => {
    console.log("action datası:" + data);
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}

export const logout = () => {


    return {
        type: "LOGOUT"

    }
}

export const update = (data) => {
    console.log(data)
    return {
        type: 'UPDATE_USER',
        payload: data
    }
}
