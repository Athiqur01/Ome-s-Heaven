import { Outlet } from "react-router-dom";
import DeshBoardPage from "../../Pages/DeshBoardPage/DeshBoardPage";


const DeshBoard = () => {
    return (
        <div>
            <h2>this is</h2>
            <DeshBoardPage></DeshBoardPage>
              <Outlet></Outlet>
        </div>
    );
};

export default DeshBoard;