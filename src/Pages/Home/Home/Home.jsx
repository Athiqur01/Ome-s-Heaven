
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
            <div>
                <h2 className='text-2xl md:text-4xl lg:text-6xl font-bold py-2 text-center'>Apartment Location</h2>
                <div className='p-10 flex gap-4'>
            <div className='w-1/2 lg:w-1/2'>
            <GoogleMap></GoogleMap>
            </div>
            <div className='w-1/2 lg:w-1/2  p-2 '><h2 className='text-2xl font-bold'>Location detail</h2><p>Ome's Heaven Apartments are ideally situated in the heart of the city, providing unparalleled access to a variety of shopping, dining, and entertainment options. Enjoy the convenience of urban living with public transportation, parks, and cultural attractions all within walking distance. Our prime location ensures you have everything you need for a comfortable and vibrant lifestyle right at your doorstep.</p></div>
            </div>
            </div>
            
        </div>
    );
};

export default Home;