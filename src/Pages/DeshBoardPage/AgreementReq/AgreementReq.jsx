import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";


const AgreementReq = () => {
    const{setLoading}=useContext(AuthContext)

    const axiosSecure=useAxiosSecure()

    

    const {data:agreements, refetch,isLoading}=useQuery({
        queryKey:['agreements'],
        queryFn: async()=>{
        const res=await axiosSecure.get('/agreement')
        setLoading(false)

        return res.data
        }
    })
    console.log(agreements)

    if(isLoading) return <span className="loading loading-bars loading-lg"></span>


    const handleDelete=(id)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
               const res=axiosSecure.delete(`/agreement/${id}`)
               
                if(res.data.deletedcount>0){
                   
                 refetch()
                 
                 setLoading(false)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });

                }
            }
          });
    }

    const handleAccept=(email)=>{
        axiosSecure.patch(`/agreement?email=${email}`)
        .then(res=>{
            if(res?.data?.modifiedCount>0){

                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Update is successful",
                    showConfirmButton: false,
                    timer: 3500
                  });
            }
        })

        axiosSecure.patch(`/user?email=${email}`)
        .then(res=>{
            console.log('data updated',res.data)
        })
    }


    return (
        <div className="p-2 md:p-8 lg:p-10 grid lg:grid-cols-2 gap-5">

         {
            agreements?.map((agreement,index)=><>

<div className="card  bg-primary text-primary-content">
  <div className="card-body font-bold">
    <h2 className="card-title">Request No: {index+1}</h2>
    <h4>User name: {agreement?.displayName}</h4>
    <h4>User email: {agreement?.email}</h4>
    <h4>Floor no: {agreement?.floorNo}</h4>
    <h4>Block name: {agreement?.blockName}</h4>
    <h4>Apartment no: {agreement?.apartmentNo}</h4>
    <h4>Rent: {agreement?.rent}</h4>
    <h4>Agreement request date: {agreement?.agreementDate}</h4>
    <div className="flex justify-between">
    <div className="card-actions ">
      <button onClick={()=>handleAccept(agreement?.email)} className="btn">Accept</button>
    </div>
    <div className="card-actions ">
      <button onClick={()=>handleDelete(agreement?._id)} className="btn">Reject</button>
    </div>
    </div>
  </div>
</div>
            
            </>)
         }
             

        </div>
    );
};

export default AgreementReq;