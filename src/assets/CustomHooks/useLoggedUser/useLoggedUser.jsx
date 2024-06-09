import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import axios from "axios";


const useLoggedUser = () => {

    const {user}=useContext(AuthContext)

    const {data:loggedUser,refetch,isLoading}=useQuery({
        queryKey:['loggedUser'],
        queryFn: async()=>{
            const res=await axios.get(`https://ome-heaven-server.vercel.app/users?email=${user?.email}`)
            return res.data
        }
    })


   // const [loggedUser, setloggeduser]=useState(null)

    // useEffect(()=>{
        
    //     axios.get(`https://ome-heaven-server.vercel.app/users?email=${user?.email}`)
    //     .then(res=>{
    //         //console.log(res.data)
    //         setloggeduser(res.data)
    //         setLoading(false)
    //     })

    // },[user?.email,setLoading])

   

    return [loggedUser,refetch,isLoading]
};

export default useLoggedUser;