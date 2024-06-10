
import useLoggedUser from '../../../assets/CustomHooks/useLoggedUser/useLoggedUser';
import Carosal from '../Carosal/Carosal';
import Coupon from '../Coupon/Coupon';
import TheBuilding from '../TheBuilding/TheBuilding';
import GoogleMap from './GoogleMap/GoogleMap';


const Home = () => {


    return (
        <div>
            <Carosal></Carosal>
            <TheBuilding></TheBuilding>
            <Coupon></Coupon>
            <GoogleMap></GoogleMap>
            
        </div>
    );
};

export default Home;