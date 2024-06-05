import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import axios from "axios";


const useLoggedUser = () => {

    const {loading,user,setLoading}=useContext(AuthContext)
    const [loggedUser, setloggeduser]=useState(null)

    useEffect(()=>{
        
        axios.get(`http://localhost:5020/users?email=${user?.email}`)
        .then(res=>{
            //console.log(res.data)
            setloggeduser(res.data)
            setLoading(false)
        })

    },[user?.email,setLoading])

    return [loggedUser]
};

export default useLoggedUser;