import {$host} from "./index";

export const getAllTeams = async function () {
    try {
        const {data} = await $host.get('api/team', {});
        return {success:true, body: data};
    }
    catch (error) {
        const msg = error.response.data.message || undefined;
        return {success:false, body: msg};
    }
}