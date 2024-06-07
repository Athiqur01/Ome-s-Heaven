
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUser = () => {

    const axiosSecure=useAxiosSecure()
    

   const {data:users, isLoading,refetch}=useQuery({
    queryKey:['users'],
    queryFn: async()=>{
     const res=await axiosSecure.get('/allUsers')
     return res.data
    },
    
   })


    return [users, isLoading,refetch]
};

export default useUser;