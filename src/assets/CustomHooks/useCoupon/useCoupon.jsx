import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useCoupon = () => {
    const axiosSecure=useAxiosSecure()
    const {data:coupons}=useQuery({
        queryKey:['coupons'],
        queryFn: async()=>{
            const res=await axiosSecure.get('/coupon')
            return res.data
        }
    })
    return [coupons]
};

export default useCoupon;