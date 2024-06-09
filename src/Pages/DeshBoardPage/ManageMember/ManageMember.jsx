import axios from "axios";
import { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useUser from "../../../assets/CustomHooks/useUser/useUser";

const ManageMember = () => {

      const axiosSecure=useAxiosSecure()

//    const {data:users, isLoading,refetch}=useQuery({
//     queryKey:['users'],
//     queryFn: async()=>{
//      const res=await axios.get('https://ome-heaven-server.vercel.app/allUsers')
//      return res.data
//     },
    
//    })


const [users, isLoading,refetch]=useUser()
//const filterUser=users.filter(user=>user.userStatus==='member')
//console.log(filterUser.length)



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

  const handleUserUpdate=(user)=>{
    //console.log(email)
    if(user?.userStatus==='member'){

        axiosSecure.patch(`singleUser?email=${user?.email}`)
    .then(res=>{
        console.log(res.data)
        refetch()

        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Successfully user role updated",
            showConfirmButton: false,
            timer: 3500
          });
    })
    }
  }


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
        <td className="hover "><button onClick={()=>handleUserUpdate(user)} className="btn btn-ghost text-xl"><AiFillDelete /></button></td>
        
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