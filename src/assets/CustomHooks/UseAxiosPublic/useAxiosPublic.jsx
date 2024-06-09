import axios from "axios"
const axiosSecure=axios.create({
    baseURL:'https://ome-heaven-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosSecure;
};

export default useAxiosPublic;