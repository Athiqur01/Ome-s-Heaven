import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../UseAxiosPublic/useAxiosPublic";


const useApartment = () => {
    const axiosPublic=useAxiosPublic()
    const {data:apartment}=useQuery({
        queryKey:['apartment'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/apartment')
            
            return res.data
        }
    })

    return[apartment]
};

export default useApartment;