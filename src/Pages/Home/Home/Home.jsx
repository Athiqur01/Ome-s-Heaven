
import useLoggedUser from '../../../assets/CustomHooks/useLoggedUser/useLoggedUser';
import TheBuilding from '../TheBuilding/TheBuilding';
import GoogleMap from './GoogleMap/GoogleMap';


const Home = () => {


    return (
        <div>
            <TheBuilding></TheBuilding>
            <GoogleMap></GoogleMap>
            
        </div>
    );
};

export default Home;