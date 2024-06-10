import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import useAgreementData from "../../../assets/CustomHooks/useAgreementData/useAgreementData";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";

import { useState } from 'react';
import { MonthPicker, MonthInput } from 'react-lite-month-picker';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const MakePayment = () => {
    

    //month picker
    const [selectedMonthData, setSelectedMonthData] = useState({
        month: 9,
        year: 2023,
      });
      const [isPickerOpen, setIsPickerOpen] = useState(false);



    const {user,setMonthValue}=useContext(AuthContext)
    const axiosSecure=useAxiosSecure()
    const {data:agreementData,refetch,isLoading}=useQuery({
        queryKey:['agreementData'],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/agreementInfo?email=${user?.email}`)
            return res.data
        }
    })

    
    if(!agreementData?.rent){
        refetch()
    }

  

    const hadleChange=()=>{
        const monthElement = document.getElementById('pick');
        const monthValue = monthElement.innerText;
        setMonthValue(monthValue)
       
            console.log(`Selected Month: ${monthValue}`);
        
    }
    


    return (
        <div>
            <h2 className="text-center text-4xl py-6 font-bold">Make your payment</h2>

            <div>
            <div>
            
            <div className=" w-full  bg-slate-100">
               

               <div>
               <div className="overflow-x-auto mx-auto font-bold ">
 <table className="table">
   {/* head */}
   <thead>
     <tr>
       
       <th></th>
       <th></th>
       
     </tr>
   </thead>
   <tbody>
     {/* row 1 */}
     

     

       <tr>
       <td>Email</td>
       <td>{user?.email}</td>
       </tr>

       <tr>
       <td>Apartment No</td>
       <td>{agreementData?.apartmentNo}</td>
       </tr>

       <tr>
           <td>Floor no</td>
       <td>{agreementData?.floorNo}</td>
       </tr>

       <tr>
           <td>Block Name</td>
       <td>{agreementData?.blockName}</td>
       </tr>

       <tr>
           <td>Rent</td>
       <td>{agreementData?.rent}</td>
       </tr>

       <tr>
           <td>Agreement Request Date</td>
       <td>{agreementData?.agreementReqDate}</td>
       </tr>

       <tr>
           <td>Agreement Accept Date:</td>
       <td>{agreementData?.agreementAcceptDate}</td>
       </tr>

       <tr>
           <td>Status</td>
       <td>{agreementData?.status}</td>
       </tr>

       <tr>
           <td>Rent to be paid for month</td>
       <td>
         {/* month picker start */}

         <div>
            <div id="pick" className="" >
        <MonthInput  
          selected={selectedMonthData}
          setShowMonthPicker={setIsPickerOpen}
          showMonthPicker={isPickerOpen}
        />
        {isPickerOpen ? (
          <MonthPicker
            setIsOpen={setIsPickerOpen}
            selected={selectedMonthData}
            onChange={setSelectedMonthData}
          />
        ) : null}
      </div>
      

            </div>

             {/* month picker end */}
       </td>
       </tr>

       
     
       
     
   </tbody>
 </table>
</div>
               </div>

           </div> 
           

       </div>
            </div>

            <div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
<div className="p-4" onClick={hadleChange}><button className="btn  btn-primary " onClick={()=>document.getElementById('my_modal_1').showModal()}>Make Payment</button></div>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    
    <h4 className=" text-lg font-semibold">Amount to be paid: {agreementData?.rent} $USD </h4>
    <div>
                <Elements stripe={stripePromise}>
                 <CheckOutForm hadleChange={hadleChange}></CheckOutForm>
                </Elements>
            </div>

    
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
            </div>


           
           


            
        </div>
    );
};

export default MakePayment;