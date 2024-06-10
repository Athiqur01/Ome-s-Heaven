import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import axios from "axios";
import { MonthPicker, MonthInput } from 'react-lite-month-picker';


const PaymentHistory = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useContext(AuthContext)
    const [monthValue,setMonthValue]=useState()

    const [selectedMonthData, setSelectedMonthData] = useState({
        month: 1,
        year: 2023,
      });
      const [isPickerOpen, setIsPickerOpen] = useState(false);


    //const [payHistory,setPayHistory]=useState()

    const {data:payHistory,refetch}=useQuery({
        queryKey:['payHistory'],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/payment?email=${user?.email}`)
            return res.data
        }
    })

    if(!payHistory){
        refetch()
    }
    
        // axiosSecure.get(`/payment?email=${user?.email}`)
        // .then(res=>{
        //     //console.log(res.data)
        //     setPayHistory(res.data)
        // })
    

    //console.log(paymentInfo)

    const hadleChange=()=>{
        const monthElement = document.getElementById('pick');
        const monthValue = monthElement.innerText;
        setMonthValue(monthValue)
       
            console.log(`Selected Month: ${monthValue}`);
        
    }

    console.log(monthValue)

    const history=payHistory?.find(pay=>pay?.fearForMonth===monthValue)
    console.log('his',payHistory)
    


    return (
        <div>

            <div className="overflow-x-auto mx-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Month</th>
        <th>Amount Paid</th>
        
      </tr>
    </thead>
    
    <tbody>
        {history? <>
            <tr className="bg-base-200">
        <th></th>
        <td>{history?.rent}</td>
        <td>{history?.fearForMonth}</td>
        
      </tr>
        </> :<>
        {/* all payment history start */}
    {payHistory?.map((payHis)=><>
        <tr className="bg-base-200">
        <th></th>
        <td>{payHis?.rent}</td>
        <td>{payHis?.fearForMonth}</td>
        
      </tr>
      </>)}
      {/* all payment history end*/}
        </>
        }
    

  </tbody>
    
  </table>
</div>

<div className="flex gap-4 ml-4">
                
         <div className="z-10">
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
            <button onClick={hadleChange}>Search</button>
            </div>

        </div>
    );
};

export default PaymentHistory;