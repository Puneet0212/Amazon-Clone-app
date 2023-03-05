import axios from "axios";

const instance = axios.create({
    baseUrl: 'https://amazon-functions.onrender.com'
});

export default instance;