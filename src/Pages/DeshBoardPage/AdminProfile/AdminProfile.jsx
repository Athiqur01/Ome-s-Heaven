

import  { useContext, useEffect, useState } from 'react';
import useLoggedUser from '../../../assets/CustomHooks/useLoggedUser/useLoggedUser';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import useAxiosSecure from '../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure';
import useApartment from '../../../assets/CustomHooks/useApartment/useApartment';
import useUser from '../../../assets/CustomHooks/useUser/useUser';


const AdminProfile = () => {
    
   const axiosSecure=useAxiosSecure()
   const [loggedUser]=useLoggedUser()
   const [agreementData, setAgreementData]=useState()
   const {userStatus, setUserStatus,user,loading, setLoading}=useContext(AuthContext)
   const [apartment]=useApartment()
   const [users, isLoading,refetch]=useUser()
   const filterUser=users?.filter(user=>user?.userStatus==='member')

    const filterUserLength=filterUser?.length
    const apartmentLength=apartment?.length
    const occupied=((filterUserLength/apartmentLength)*100 )?.toFixed(2)
    const vaccant= ((apartmentLength-filterUserLength)*100/apartmentLength)?.toFixed(2)
    console.log(vaccant)

   
   

    //console.log('logged-------',userStatus)
    

    useEffect(()=>{
      
        axiosSecure.get(`/agreementInfo?email=${loggedUser?.email}`)
        .then(res=>{
            console.log('jjj',res.data)
            setAgreementData(res.data)
            setLoading(false)
        })
    },[loggedUser?.email])




    useEffect(()=>{
        
        axiosSecure.get(`/users?email=${loggedUser?.email}`)
        .then(res=>{
            console.log('kk',res.data.userStatus)
            setUserStatus(res.data.userStatus)
            setLoading(false)
        })
    },[loggedUser?.email])


   
    
   

    


    return (
        <div>
            
             <div className=" w-full  bg-slate-50">
                <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center pt-6  ">My Profile</h2>

                <div>
                <div className="overflow-x-auto mx-auto font-bold ">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th></th>
        <th></th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr className="bg-base-200">
        <td>Photo:</td>
        <td><img className='max-w-32 max-h-32' src={loggedUser?.photoURL} alt="" /></td>
      </tr>

      <tr>
      <td>Admin Name:</td>
        <td>{loggedUser?.displayName}</td>
        </tr>

        <tr>
        <td>Email:</td>
        <td>{loggedUser?.email}</td>
        </tr>

        <tr>
        <td>Total number of room:</td>
        <td>{apartment?.length}</td>
        </tr>

        <tr>
            <td>Percentage of available rooms:</td>
        <td>{vaccant} %</td>
        </tr>

        <tr>
            <td>Percentage of agreement/unavailable rooms:</td>
        <td>{occupied} %</td>
        </tr>

        <tr>
            <td>Number of users:</td>
        <td>{users?.length}</td>
        </tr>

        <tr>
            <td>Number of members:</td>
        <td>{filterUser?.length}</td>
        </tr>

        

       
      
      
      
    </tbody>
  </table>
</div>
                </div>

            </div> 
        </div>
    );
};

export default AdminProfile;
