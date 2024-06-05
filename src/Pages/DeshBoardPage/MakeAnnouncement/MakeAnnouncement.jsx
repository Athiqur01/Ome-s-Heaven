import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";


const MakeAnnouncement = () => {

    const axiosSecure=useAxiosSecure()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
        console.log(data)
        
         const {title,announcement}=data 
         const announcementData={title,announcement}  
         
         axiosSecure.post('/announcements',announcementData)
         .then(res=>{
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Announcemet successfully delevered",
                    showConfirmButton: false,
                    timer: 3500
                  });

            }
         })
        
        
      }

    return (
        <div>
            <h2 className="text-4xl font-bold text-center pt-12">Announcement</h2>
            <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
  <div className="form-control">
    <label className="label">
      <span className="label-text font-bold text-base opacity-60">Title</span>
    </label>
    <input type="text" placeholder="Title" {...register("title")} className="input input-bordered"  />
  </div>
  
  <div className="form-control">
    <label className="label">
      <span className="label-text font-bold text-base opacity-60">Announcement</span>
    </label>
    <textarea type="text" placeholder="Make Announcement" {...register("announcement")} className="textarea textarea-bordered textarea-lg w-full "    ></textarea>
  </div>
  
  <div className="form-control mt-6">
    <button className="btn btn-primary text-base font-bold">Make Announcement</button>
  </div>
</form>
            </div>
        </div>
    );
};

export default MakeAnnouncement;