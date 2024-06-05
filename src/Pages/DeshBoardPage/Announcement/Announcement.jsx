import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../assets/CustomHooks/UseAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Announcement = () => {

    //const [announcements,setAnnouncements]=useState()
    const axiosPublic=useAxiosPublic()
     
    // useEffect(()=>{
    //     axiosPublic.get('/announcements')
    //     .then(res=>{
    //         console.log(res.data)
    //         setAnnouncements(res.data)
    //     })

    // },[setAnnouncements])

    const{data:announcements}=useQuery({
        queryKey:['announcements'],
        queryFn: async ()=>{
            const res=await axiosPublic.get('/announcements')
            return res.data
        }
    })

    console.log(announcements)

    return (
        <div className="mx-4 md:mx-6 lg:mx-10 opacity-90 " >
            {
                announcements?.map(announcement=><>
                <div className="shadow-xl p-4 rounded-s-md">
                <h2 className="text-center py-8 font-bold text-2xl lg:text-4xl">{announcement?.title}</h2>
                <p className="text-justify lg:text-lg">{announcement?.announcement}</p>
                </div>
                
                </>)
            }
        </div>
    );
};

export default Announcement;