import Swal from "sweetalert2";


const Coupon = () => {

    const handleCoupon=()=>{
        Swal.fire({
            title: "Code: 2Y100",
            text: "Coupon Expired within 7 days",
            imageUrl: "https://i.ibb.co/74kLsG4/1.png",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
    }

    return (
        <div className="pb-10 px-4 lg:px-12 ">
            <h2 className="text-2xl lg:text-6xl text-center pb-6 lg:pb-12 font-bold">Get Coupon</h2>
            <div className="md:flex lg:flex gap-6 rounded-md shadow-lg">
                <div className="w-full lg:w-1/2 "><img className="rounded-md" src="https://i.ibb.co/nnLfFWq/2100.jpg" alt="" /></div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center text-xl rounded-lg space-y-4">
                    <p>Check out our latest deals and discounts! Coupons available now—grab yours before they expire!</p>
                    <button onClick={handleCoupon} className="btn btn-primary">Get Coupon</button>
                </div>
            </div>
        </div>
    );
};

export default Coupon;