import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async function (email, password) {
    try {
        const {data} = await $host.post('api/user/registration',
            {email, password, role: 'admin'}
        );
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    }
    catch (e) {
        console.log(e)
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
        return {success:false, body: error.response.data.message};
    }
}

export const check = async function () {
    const {data} = await $authHost.get('api/user/auth',
        {email, password}
    );
    localStorage.setItem('token', data.token);
    return {success:true, body: jwtDecode(data.token)};
}