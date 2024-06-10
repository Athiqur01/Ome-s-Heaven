import Swal from "sweetalert2";


const Coupon = () => {

    const handleCoupon=()=>{

        

        // Swal.fire({
        //     title: `Code: 2Y100`,
        //     text: "Coupon Expired within 7 days",
        //     imageUrl: "https://i.ibb.co/74kLsG4/1.png",
        //     imageWidth: 400,
        //     imageHeight: 200,
        //     imageAlt: "Custom image"
        //   });
    }

    return (
        <div className="pb-10 px-4 lg:px-12 ">
            <h2 className="text-2xl lg:text-6xl text-center pb-6 lg:pb-12 font-bold">Get Coupon</h2>
            <div className="md:flex lg:flex gap-6 rounded-md shadow-lg">
                <div className="w-full lg:w-1/2 "><img className="rounded-md" src="https://i.ibb.co/nnLfFWq/2100.jpg" alt="" /></div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center text-xl rounded-lg space-y-4">
                    <p>Check out our latest deals and discounts! Coupons available now—grab yours before they expire!</p>
                    
                
                <div>
                        {/* modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_1').showModal()}>Get Coupon</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <div><img src="https://i.ibb.co/grNzzxs/Screenshot-1.png" alt="" /></div>
    <h3 className="font-bold text-lg"> % discount</h3>
    <p className="py-4">Code:</p>
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
            </div>

        



        </div>
    );
};

export default Coupon;