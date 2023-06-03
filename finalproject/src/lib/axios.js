import axios from "axios";

export const api = axios.create({
    baseURL: "https://educate-mazenelali.onrender.com",
    // "content-type":"aplication/json"
});
