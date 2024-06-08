import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../../../assets/CustomHooks/useLoggedUser/useLoggedUser";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";



const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError]=useState()
    const axiosSecure=useAxiosSecure()
   
    const [loggedUser]=useLoggedUser()
    const [clientSecret,setClientSecret]=useState()
    const {user}=useContext(AuthContext)
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
            console.log(res.data?.clientSecret)
            setClientSecret('client secret',res.data?.clientSecret)
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
      <button className="btn btn-primary" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-400">{error}</p>

            </form>
            
        </div>
    );
};

export default CheckOutForm;