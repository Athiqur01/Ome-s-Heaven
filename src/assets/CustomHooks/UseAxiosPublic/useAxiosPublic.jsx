import axios from "axios"
const axiosSecure=axios.create({
    baseURL:'http://localhost:5020'
})

const useAxiosPublic = () => {
    return axiosSecure;
};

export default useAxiosPublic;