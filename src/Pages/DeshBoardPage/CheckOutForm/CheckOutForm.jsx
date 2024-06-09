import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../../../assets/CustomHooks/useLoggedUser/useLoggedUser";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import "../CheckOutForm/styles/common.css"
import Swal from "sweetalert2";



const CheckOutForm = ({hadleChange}) => {
  console.log('handle',hadleChange)
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError]=useState()
    const axiosSecure=useAxiosSecure()
    const [transectionId,setTransectionId]=useState()
   
    
    const [clientSecret,setClientSecret]=useState()
    const {user,monthValue}=useContext(AuthContext)
    
    //const [loading,user]=useContext(AuthContext)

    // useEffect(()=>{
      
    //     axiosSecure.get(`/agreementInfo?email=${loggedUser?.email}`)
    //     .then(res=>{
    //         console.log('jjj',res.data)
    //         setAgreementData(res.data)
            
    //     })
    // },[loggedUser?.email,axiosSecure])

    const {data:agreementData2,refetch,isLoading}=useQuery({
        queryKey:['agreementData2'],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/agreementInfo?email=${user?.email}`)
            return res.data
        }
    })

    
    if(!agreementData2?.rent){
        refetch()
    }
    
    const price=agreementData2?.rent
    
    useEffect(()=>{
        if(price>0){
            axiosSecure.post("/create-payment-intent",{price})
        .then(res=>{
            
            setClientSecret(res.data?.clientSecret)
        })

        }
        
    },[axiosSecure,price])


    const handleSubmit=async (e)=>{
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
          }
      
          // Get a reference to a mounted CardElement. Elements knows how
          // to find your CardElement because there can only ever be one of
          // each type of element.
          const card = elements.getElement(CardElement);
      
          if (card == null) {
            return;
          }

           // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
        setError(error.message)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setError('')
      }

      //Confirm payment
      console.log('client secret',clientSecret)
      console.log('secret',clientSecret)
      const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card:card,
            billing_details:{
                email:user?.email || 'Anonymous',
                name:user?.displayName || 'Anonymous'
            }
        }
      })
      if(error){
        console.log('Confirm error')
      }

      else{
        console.log('PaymentIntent',paymentIntent)
        if(paymentIntent?.status==="succeeded"){
            console.log(paymentIntent.id)
            setTransectionId(paymentIntent.id)

        }
      }

      const payment={
        email:user?.email,
        floorNo:agreementData2?.floorNo,
        blockName:agreementData2?.blockName,
        apartmentNo:agreementData2?.apartmentNo,
        rent:agreementData2?.rent,
        agreementAcceptDate:agreementData2?.agreementAcceptDate,
        fearForMonth:monthValue,
        transectionId:transectionId
    }
    console.log(payment)

    //post operation for payment data
    axiosSecure.post("/payment",payment)
    .then(res=>{
      console.log(res.data)
      if(res.data.insertedId){
          Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Payment is successful",
              showConfirmButton: false,
              timer: 3500
            });

      }
    })


    }

    

    return (
        <div>
            <form onSubmit={handleSubmit} >
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div >
      <button onClick={handleSubmit}  className="btn btn-primary" type="submit" disabled={!stripe || !clientSecret}>
       Confirm Payment
      </button>
      </div>
      <p className="text-red-400">{error}</p>
      {transectionId && <p className="bg-green-500">your transection id: {transectionId} </p>}

            </form>
            
        </div>
    );
};

export default CheckOutForm;