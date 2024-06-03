import { Outlet } from "react-router-dom";
import DeshBoardPage from "../../Pages/DeshBoardPage/DeshBoardPage";


const DeshBoard = () => {
    return (
        <div className="flex ">
            <div className="w-[30%]"><DeshBoardPage></DeshBoardPage></div>
            <div className="w-[70%]  w-full mt-4  bg-slate-50">
            
            <div >
                <h2 className="text-6xl font-bold text-center pt-4 md:pt-8 lg:pt-10 ">Ome's Heaven</h2>
            </div> 
            <Outlet></Outlet>
            </div>
            
            
            
              
        </div>
    );
};

export default DeshBoard;