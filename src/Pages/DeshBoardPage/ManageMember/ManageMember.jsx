import axios from "axios";
import { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageMember = () => {

     const axiosSecure=useAxiosSecure()

   const {data:users, isLoading}=useQuery({
    queryKey:['users'],
    queryFn: async()=>{
     const res=await axios.get('http://localhost:5020/allUsers')
     return res.data
    },
    
   })

   if(isLoading){
    return <>loading----</>
   }

   console.log('iiii',users)

// useEffect(()=>{
//     axiosSecure.get("/allUsers")
//     .then(res=>{
//         console.log(res.data)
//     })
// },[])

  // console.log('users',users)
    return (
        <div className="mx-auto">

<div className="overflow-x-auto px-2 py-4 lg:px-6 py-10 mx-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="lg:text-xl">
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        
      {/* row  */}
      {
        users?.map((user,index)=><>
                          <tr className="hover lg:text-xl">
        <th>{index+1}</th>
        <td>{user?.displayName}</td>
        <td>{user?.email }</td>
        <td>{user?.userStatus}</td>
        <td className="hover "><AiFillDelete /></td>
        
      </tr>
        </>)
      }
      
    </tbody>
  </table>
</div>
            
        </div>
    );
};

export default ManageMember;