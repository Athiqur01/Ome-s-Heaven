import {  useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useLoggedUser from "../../assets/CustomHooks/useLoggedUser/useLoggedUser";
import useApartment from "../../assets/CustomHooks/useApartment/useApartment";


const Apartment = () => {
  const [loggedUser]=useLoggedUser()
  const {user,setLoading}=useContext(AuthContext)
    const axiosSecure=useAxiosSecure()
    

    // const {data:apartment}=useQuery({
    //     queryKey:['apartment'],
    //     queryFn:async()=>{
    //       setLoading(true)
    //         const res=await axiosSecure.get('/apartment')
    //         setLoading(false)
    //         return res.data
    //     }
    // })

    const [apartment]=useApartment()

    

    
    //const email=user?.email
    const agreementReqDate = new Date();
    const status='pending'
    const displayName=loggedUser?.displayName
    const email=loggedUser?.email
    const photoURL=loggedUser?.photoURL
    console.log(displayName,email,loggedUser?.displayName
    )
    
    
    

    const handleAgreement=(floorNo,blockName,apartmentNo,rent)=>{

     const agreementInfo={email,displayName,photoURL, floorNo,blockName,apartmentNo,rent,agreementReqDate,status}
     console.log('info',agreementInfo)
     axiosSecure.post('/agreementInfo',agreementInfo)
     .then(res=>{
      if(res.data.insertedId){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Agreemet Request Sent",
          showConfirmButton: false,
          timer: 3500
        });
      }
     })
    }



    return (
        <div>
            <h2 className="text-center text-2xl md:text-4xl lg:text-6xl font-bold py-12">Choose Your Apartment</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-1 lg:p-4">
           {apartment?.map(singleApartment=><>

            <div className="card  bg-base-100 shadow-xl">
  <figure><img className="object-cover max-h-48 w-full" src={singleApartment.apartment_image} alt="Shoes" /></figure>
  <div className="card-body">
    <h4>Floor no: {singleApartment.floor_no}</h4>
    <h4>Block name: {singleApartment.block_name }</h4>
    <h4>Apartment no: {singleApartment.apartment_no}</h4>
    <h4>Rent: {singleApartment.rent} $USD</h4>
    
    <div className="card-actions justify-end">
      <button onClick={()=>handleAgreement(singleApartment.floor_no,singleApartment.block_name,singleApartment.apartment_no,singleApartment.rent)} className="btn btn-primary">Agreement</button>
    </div>
  </div>
</div>
           
           </>)}
        </div>
        </div>
    );
};

export default Apartment;