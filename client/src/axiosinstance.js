import axios from "axios";

export const bookBaseUrl=axios.create({
    baseURL:"https://bookmanageserver.onrender.com",
})
