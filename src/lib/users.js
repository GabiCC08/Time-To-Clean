
import api from "./api";
async function getById(id) {
return await api.get(`/users/${id}`)
}
export const User={
    getById,
}