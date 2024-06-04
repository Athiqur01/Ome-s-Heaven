import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";


const AgreementReq = () => {

    const axiosSecure=useAxiosSecure()

    const {data:agreements, refetch}=useQuery({
        queryKey:['agreements'],
        queryFn: async()=>{
        const res=await axiosSecure.get('/agreement')
        return res.data
        }
    })
    console.log(agreements)

    return (
        <div className="p-2 md:p-8 lg:p-10 grid lg:grid-cols-2 gap-5">

         {
            agreements.map((agreement,index)=><>

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
      <button className="btn">Accept</button>
    </div>
    <div className="card-actions ">
      <button className="btn">Reject</button>
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