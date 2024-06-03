import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo3.png"
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";
const Navbar = () => {

    const {user, logOut,loading,setLoading}=useContext(AuthContext)
    const axiosSecure=useAxiosSecure()

    const {refetch, data:loggedUser2}=useQuery({
        queryKey:['loggedUser2'],
        queryFn: async()=>{
            if(loading){
                return <>loading-------</>
            }
            const res=await axiosSecure.get(`/users?email=${user?.email}`)
            setLoading(false)
            return res.data
        }
      })

      refetch()
     
      console.log('looggg',loggedUser2)



    const navLink=<>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/apartment">Apartment</NavLink></li>
                   
                 </>

    const idForDropDown=document.getElementById('drop-down')

    const handleDownOperation=()=>{
        idForDropDown.classList.remove('hidden')
    }
    const handleUpOperation=()=>{
        idForDropDown.classList.add('hidden')
    }



    return (
        <div className="">
            <div className="navbar bg-[#100F6C] rounded-md text-white ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navLink}
      </ul>
    </div>
    <Link to="/"><div className="">
    <img className="max-w-60 rounded-md py-4 px-2"  src={logo} alt="" />
    </div></Link>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-lg">
      {navLink}
    </ul>
  </div>
  <div className="navbar-end pr- text-lg relative">
    {user?<><img onClick={handleDownOperation} className="rounded-full  w-14  h-14 " src={loggedUser2.photoURL} alt="" /> </>  :<><NavLink to="/logIn">LogIn</NavLink> </>}
    <div id="drop-down" className="bg-[#100F6C] rounded-b-md z-10 absolute w-48 md:w-60 lg:w-64 mt-[270px] md:mt-[270px] lg:mt-[272px] duration-1000 delay-1000 hidden ">
        <ul onClick={handleUpOperation} className="p-4 font-bold">
            <button className="btn btn-ghost w-full text-left"><li>{loggedUser2?.displayName}</li></button>
            <button className="btn btn-ghost w-full text-left"><li>Deshboard</li></button>
            <button className="btn btn-ghost w-full text-left"><li onClick={logOut}>Log Out</li></button>
            
        </ul>
    </div>
  </div>
</div>
        </div>
    );
};

export default Navbar;