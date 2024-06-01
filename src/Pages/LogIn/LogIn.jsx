import { useContext } from "react";
import img from "../../assets/login.jpg"
import { useForm } from "react-hook-form"
import AuthProvider, { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { QueryClient, useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
import axios from "axios";

const LogIn = () => {

    const {loginUser,setLoading,setUser,user}=useContext(AuthContext)
    const axiosSecure=useAxiosSecure()
    const queryClient = new QueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
        console.log(data)
        loginUser(data.email,data.password)
        .then(result=>{
            console.log(result.user)
            setUser(result.user)
            setLoading(false)
        })
      }

      const {refetch, data:allUser}=useQuery({
        queryKey:['allUser'],
        queryFn: async()=>{
            const res=await axiosSecure.get('/users')
            return res.data
        }
      })

      const { data:loggedUser2}=useQuery({
        queryKey:['loggedUser2'],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data
        }
      })

    

      console.log('allUser',allUser)
      console.log('looggg',loggedUser2)

    return (
        <div>
            
              <div className="hero min-h-screen bg-base-200">
                <div>
                    <h2 className="text-center text-6xl font-bold pb-6">LogIn Now</h2>

                <div className="hero-content gap-10 flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left w-full lg:w-1/2">
      <img className="lg:max-w-[550px] rounded-lg object-cover" src={img} alt="" />
    </div>
    <div className="card shrink-0  shadow-2xl bg-base-100  w-full lg:w-1/2 ">
    
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Enter email" {...register("email", { required: true })} className="input input-bordered"  />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text"> Password</span>
          </label>
          <input type="password" placeholder="Type Password" {...register("password", { required: true, 
          minLength: 6,
          maxLength:20,
          pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])/,
           },   )} className="input input-bordered" required />
          {errors.password?.type==="minLength" && <span className="text-red-500">Password must be at least 6 character</span>}
          {errors.password?.type==="pattern" && <span className="text-red-500">Password must contains at least one uppercase, one lowercase and one special character</span>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <div className=" flex gap-2 items-center justify-center pb-6">
        <small>New user? Please</small> 
        <Link to="/register"><p className="text-blue-700 font-bold">Register</p></Link>
      </div>
    </div>
  </div>


                </div>
                
              
  
              </div>
            
        </div>
    );
};

export default LogIn;