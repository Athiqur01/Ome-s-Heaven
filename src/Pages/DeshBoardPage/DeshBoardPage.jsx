import { FaHouseUser } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { Link } from "react-router-dom";

const DeshBoardPage = () => {
    return (
        <div >
            <div className=" min-h-screen bg-orange-100 pl-2 md:pl-6 lg:pl-10">
            <h2 className="font-bold mt-4  py-6 lg:text-3xl">Ome's Heaven</h2>
                <ul>
                    <li className="font-bold flex items-center gap-2  lg:text-xl"><FaHouseUser /> <Link to="/deshBoard/MyProfile"> My Profile </Link></li>
                    <li className="font-bold flex items-center gap-2  lg:text-xl"><GrAnnounce /> <Link to="/deshBoard/announcement">Announcements</Link> </li>
                    
                </ul>
            </div>
            {/* <div className="w-[70%] bg-slate-50">
                <h2 className="text-6xl font-bold text-center pt-4 md:pt-8 lg:pt-10">Ome's Heaven</h2>
            </div> */}
            
        </div>
    );
};

export default DeshBoardPage;