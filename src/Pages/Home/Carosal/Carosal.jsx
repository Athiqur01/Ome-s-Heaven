
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import img1 from "../Carosal/Asset/1.jpg"
import img2 from "../Carosal/Asset/11.jpg"
import img3 from "../Carosal/Asset/9.jpg"
import { Link } from 'react-router-dom';

const Carosal = () => {
    return (
        <div>
            <div>
                <>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper min-h-80  ">
            

          <SwiperSlide>
              <div className="bg-cover bg-no-repeat w-full h-[550px] h-[600px] py-40 flex flex-col items-center justify-center space-y-6 rounded-b-lg" style={{ backgroundImage: `url(${img1})` }}>
              <h1 className="text-[#d099df] text-xl lg:text-5xl font-bold text-center  ">Discover comfort and luxury at Ome's Heaven <br /> Apartments—your sanctuary.</h1>
                 <div className='flex flex-col md:flex-row lg:flex-row space-x-3 space-y-3 md:space-y-0 w-full justify-center items-center'>
                 <Link to="/apartment"><button className='bg-[#784ae6] text-white text-xl rounded-md md:px-6 py-1'>Explore Apartments </button></Link>
                 
                 </div>
              </div>  
            </SwiperSlide>
            
            
            
            <SwiperSlide>
              <div className="bg-cover bg-no-repeat w-full h-[550px] h-[600px] flex flex-col items-center justify-center space-y-6 rounded-b-lg" style={{ backgroundImage: `url(${img2})` }}>
              
              <div className='flex flex-col md:flex-row lg:flex-row space-x-3 space-y-3 md:space-y-0 w-full justify-center items-center'>
                 <input type="text" placeholder="location" className="input input-bordered lg:w-full max-w-xs" />
                 <button className='bg-[#8255EF] text-white text-xl rounded-md md:px-6 py-1'>Search </button>
                 </div>
              
              </div> 
               
            </SwiperSlide>

            

            <SwiperSlide>
              <div className="bg-cover bg-no-repeat w-full h-[550px] h-[600px] flex flex-col items-center justify-center space-y-6 rounded-b-lg" style={{ backgroundImage: `url(${img3})` }}>
              <h1 className="text-[#FAEAFF] text-xl lg:text-5xl font-bold text-center  ">Get Coupon for discount</h1>
              
                 <div className='flex space-x-3 w-full justify-center'>
                 
                 <button className='bg-[#8255EF] text-white text-xl rounded-md px-6 py-1'>Coupon</button>
                 </div>
              </div>  
            </SwiperSlide>
            
          </Swiper>
        </>
            
        </div>
            
        </div>
    );
};

export default Carosal;