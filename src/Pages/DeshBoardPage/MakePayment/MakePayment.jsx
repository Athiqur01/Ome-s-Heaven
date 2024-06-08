import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../CheckOutForm/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const MakePayment = () => {
    return (
        <div>
            <h2 className="text-center text-4xl py-6 font-bold">Make your payment</h2>
            <div>
                <Elements stripe={stripePromise}>
                 <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
            
        </div>
    );
};

export default MakePayment;