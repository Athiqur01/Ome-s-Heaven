import { useContext, useState } from "react";
import { FaHouseUser } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { RiCoupon2Fill } from "react-icons/ri";
import { SiLibreofficewriter } from "react-icons/si";
import { MdManageAccounts } from "react-icons/md";
import useLoggedUser from "../../assets/CustomHooks/useLoggedUser/useLoggedUser";

const DeshBoardPage = () => {
    const { user}=useContext(AuthContext)
    const [loggedUser]=useLoggedUser()
    console.log('userStatus',loggedUser?.userStatus)
    if(loggedUser?.userStatus==='user'){
        return (
            <div >
                <div className=" min-h-screen bg-orange-100 pl-2 md:pl-6 lg:pl-10">
                <h2 className="font-bold mt-4  py-6 lg:text-3xl">Ome's Heaven</h2>
                    <ul>
                        <li className="font-bold flex items-center gap-2  lg:text-xl"><FaHouseUser /> <Link to="/deshBoard/MyProfile"> My Profile </Link></li>
                        <li className="font-bold flex items-center gap-2  lg:text-xl"><GrAnnounce /> <Link to="/deshBoard/announcement">Announcements</Link> </li>
                        
                    </ul>
                </div>
            </div>
        );
    }


    if(loggedUser?.userStatus==='admin'){
        return (
            <div >
                <div className=" min-h-screen bg-orange-100 pl-2 md:pl-6 lg:pl-10">
                <h2 className="font-bold mt-4  py-6 lg:text-3xl">Ome's Heaven</h2>
                    <ul>
                        <li className="font-bold flex items-center gap-2  lg:text-xl py-1"><FaHouseUser /> <Link to="/deshBoard/adminProfile"> Admin Profile </Link></li>
                        <li className="font-bold flex items-center gap-2  lg:text-xl py-1"><MdManageAccounts /> <Link to="/deshBoard/MyProfile"> Manage Members </Link></li>
                        <li className="font-bold flex items-center gap-2  lg:text-xl py-1"><GrAnnounce /> <Link to="/deshBoard/announcement">Make Announcement</Link> </li>
                        <li className="font-bold flex items-center gap-2  lg:text-xl py-1"><SiLibreofficewriter /> <Link to="/deshBoard/agreementReq">Agreement Requests</Link> </li>
                        <li className="font-bold flex items-center gap-2  lg:text-xl py-1"><RiCoupon2Fill /> <Link to="/deshBoard/announcement">Manage Coupon</Link> </li>
                        
                    </ul>
                </div>
            </div>
        );

        

    }
};

export default DeshBoardPage;