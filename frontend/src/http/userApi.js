import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async function (email, password) {
    try {
        const {data} = await $host.post('api/user/registration',
            {email, password, role: 'admin'}
        );
        localStorage.setItem('token', data.token);
        return {success:true, body: jwtDecode(data.token)};
    }
    catch (error) {
        const msg = error.response.data.message || undefined;
        return {success:false, body: msg};
    }
}

export const login = async function (email, password) {
    try {
        const {data} = await $host.post('api/user/login',
            {email, password}
        );
        localStorage.setItem('token', data.token);
        return {success:true, body: jwtDecode(data.token)};
    }
    catch (error) {
        const msg = error.response.data.message || undefined;
        return {success:false, body: msg};
    }
}



export const check = async function () {
    const {data} = await $authHost.get('api/user/auth',);
    localStorage.setItem('token', data.token);
    return {success:true, body: jwtDecode(data.token)};
}