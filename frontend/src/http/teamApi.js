import {$host} from "./index";

export const getAllTeams = async function () {
    try {
        const {data} = await $host.get('api/team', {});
        return {success:true, body: data};
    }
    catch (error) {
        const msg = error?.response?.data?.message || undefined;
        return {success:false, body: msg};
    }
}

export const getOneTeam = async function (id) {
    if (!id)
        return null;

    try {
        const {data} = await $host.get('api/team/' + id, {});
        return {success:true, body: data};
    }
    catch (error) {
        console.log(error)
        const msg = error?.response?.data?.message || undefined;
        return {success:false, body: msg};
    }
}