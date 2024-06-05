import React, { useContext, useEffect, useState } from 'react';
import useLoggedUser from '../../../assets/CustomHooks/useLoggedUser/useLoggedUser';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import axios from 'axios';
import useAgreementData from '../../../assets/CustomHooks/useAgreementData/useAgreementData';
import useAxiosSecure from '../../../assets/CustomHooks/useAxiosSecure/useAxiosSecure';
import { useQueries, useQuery } from '@tanstack/react-query';

const MyProfile = () => {
    
   const axiosSecure=useAxiosSecure()
   const [loggedUser]=useLoggedUser()
   const [agreementData, setAgreementData]=useState()
   const {userStatus, setUserStatus,user,loading, setLoading}=useContext(AuthContext)
   
   

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
        <td>Photo</td>
        <td><img className='max-w-32 max-h-32' src={loggedUser?.photoURL} alt="" /></td>
      </tr>

      <tr>
      <td>Name</td>
        <td>{loggedUser?.displayName}</td>
        </tr>

        <tr>
        <td>Email</td>
        <td>{loggedUser?.email}</td>
        </tr>

        <tr>
        <td>Apartment No</td>
        <td>{agreementData?.apartmentNo}</td>
        </tr>

        <tr>
            <td>Floor no</td>
        <td>{agreementData?.floorNo}</td>
        </tr>

        <tr>
            <td>Block Name</td>
        <td>{agreementData?.blockName}</td>
        </tr>

        <tr>
            <td>Rent</td>
        <td>{agreementData?.rent}</td>
        </tr>

        <tr>
            <td>Agreement Request Date</td>
        <td>{agreementData?.agreementReqDate}</td>
        </tr>

        <tr>
            <td>Agreement Accept Date:</td>
        <td>{agreementData?.agreementAcceptDate}</td>
        </tr>

        <tr>
            <td>Status</td>
        <td>{agreementData?.status}</td>
        </tr>
      
      
      
    </tbody>
  </table>
</div>
                </div>

            </div> 
        </div>
    );
};

export default MyProfile;