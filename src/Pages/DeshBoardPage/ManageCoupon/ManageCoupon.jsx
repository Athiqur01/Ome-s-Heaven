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
    const {data:coupons,refetch}=useQuery({
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

      const handleDelete=id=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
               const res=axiosSecure.delete(`/coupon/${id}`)
               console.log(res.data)
               refetch()
                if(res.data.deletedcount>0){
                   
                 
                 
                 
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });

                }
            }
          });
      }



    return (
        <div>

            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Coupon</th>
        <th>Discount</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        coupons?.map(coupon=><>
        <tr className="bg-base-200">
        <th></th>
        <td>{coupon?.copunCode}</td>
        <td>{coupon?.discountPercentage} %</td>
        <td><button onClick={()=>handleDelete(coupon?._id)} className="btn btn-ghost">Delete</button></td>
      </tr>
        </>)
      }
    </tbody>
  </table>
</div>
            </div>

            <div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-primary mr-4" onClick={()=>document.getElementById('my_modal_1').showModal()}>Add Coupon</button>
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