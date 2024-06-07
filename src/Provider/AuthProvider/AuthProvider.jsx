import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../Firebase/firebase.config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../assets/CustomHooks/UseAxiosPublic/useAxiosPublic";

export const AuthContext=createContext(null)
const auth=getAuth(app)


const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null)
    const [loading, setLoading]=useState(true)
    const [userStatus, setUserStatus]=useState()
    
    const axiosPublic=useAxiosPublic()
   

    const createUser=(email,password)=>{
       setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }

    const loginUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
       const unSubscribe= onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            if(currentUser){
                const userInfo={email:currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })
                
            }
            setLoading(false)
            console.log('current user', currentUser)
        });
        return ()=>{
            return unSubscribe()
        }
    },[])

    const authInfo={user,setUser, loading,setLoading, createUser, loginUser, logOut,userStatus, setUserStatus}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;