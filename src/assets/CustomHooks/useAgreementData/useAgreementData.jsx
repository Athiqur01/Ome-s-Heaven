import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';

const useAgreementData = () => {
    const {user}=useContext(AuthContext)

    const {refetch,data:agreementDate}=useQuery({
        queryKey:['agreementDate'],
        queryFn:async ()=>{
            const res=await useAxiosSecure.get(`/agreementInfo?email=${user?.email}`)
            
                return res.data
        }
       })
       
    
       if(!agreementDate){
        refetch()
       }
       console.log('higi---',agreementDate)

    return [refetch,agreementDate]
};

export default useAgreementData;