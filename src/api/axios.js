import axios from "axios";

const instace = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key:"8ab302e2b3a1559c74eb11db0b4fbd29",
        language: "ko-KR"
    },
});

export default instace;