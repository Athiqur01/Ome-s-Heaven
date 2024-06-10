import { useContext } from "react";

import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import useCoupon from "../../../assets/CustomHooks/useCoupon/useCoupon";
import { useQuery } from "@tanstack/react-query";




const ManageCoupon = () => {

//  const [coupons]=useCoupon()


   // const axiosSecure=useAxiosSecure()
    
    //const [data, setData]=useContext(null)
    //const userStatus='user'

    const axiosSecure=useAxiosSecure()
    const {data:coupons}=useQuery({
        queryKey:['coupons'],
        queryFn: async()=>{
            const res=await axiosSecure.get('/coupon')
            return res.data
        }
    })

     console.log(coupons)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
        console.log(data)
        //setData(data)
         const {copunCode,description,discountPercentage}=data 
        // const userData={email,displayName,photoURL,userStatus}      
        console.log(copunCode,description,discountPercentage)
        const couponInfo={copunCode,description,discountPercentage}

        axios.post('http://localhost:5020/coupon',couponInfo)
        .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Coupon Added successful",
                    showConfirmButton: false,
                    timer: 3500
                  });

            }
        })
        
      }



    return (
        <div>
            <div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_1').showModal()}>Add Coupon</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
  <div className="card shrink-0   bg-base-100 w-full lg:w-1/2 ">
    
    
<form onSubmit={handleSubmit(onSubmit)} className="card-body">
  <div className="form-control">
    <label className="label">
      <span className="label-text">Copun Code</span>
    </label>
    <input type="text" placeholder="Copon Code" {...register("copunCode")} className="input input-bordered"  />
  </div>
  <div className="form-control">
    <label className="label">
      <span className="label-text">Discount Percentage</span>
    </label>
    <input type="text" placeholder="Discount amount without special character" {...register("discountPercentage")} className="input input-bordered"  />
  </div>
  <div className="form-control">
    <label className="label">
      <span className="label-text">Description</span>
    </label>
    <input type="text" placeholder="Description" {...register("description", { required: true })} className="input input-bordered"  />
    
  </div>
  
  <div className="form-control mt-6">
    <button className="btn btn-primary">Submit</button>
  </div>
</form>
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

export default ManageCoupon;