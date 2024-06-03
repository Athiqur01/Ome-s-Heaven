import { FaHouseUser } from "react-icons/fa";

const DeshBoardPage = () => {
    return (
        <div className="flex">
            <div className="w-[30%] min-h-screen bg-orange-100 pl-2 md:pl-6 lg:pl-10">
            <h2 className="font-bold  my-6 lg:text-2xl">Ome's Heaven</h2>
                <ul>
                    <li className="font-bold"><FaHouseUser /> My Profile</li>
                    <li className="font-bold">Announcements</li>
                    
                </ul>
            </div>
            <div className="w-[70%]"></div>
            
        </div>
    );
};

export default DeshBoardPage;