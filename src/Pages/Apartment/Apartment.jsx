import {  useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../assets/CustomHooks/useAxiosSecure/useAxiosSecure";


const Apartment = () => {
    const axiosSecure=useAxiosSecure()

    const {data:apartment}=useQuery({
        queryKey:['apartment'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/apartment')
            return res.data
        }
    })

    console.log(apartment)

    return (
        <div>
            <h2 className="text-center text-2xl md:text-4xl lg:text-6xl font-bold py-12">Choose Your Apartment</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-1 lg:p-4">
           {apartment?.map(singleApartment=><>

            <div className="card  bg-base-100 shadow-xl">
  <figure><img className="object-cover max-h-48 w-full" src={singleApartment.apartment_image} alt="Shoes" /></figure>
  <div className="card-body">
    <h4>Floor no: {singleApartment.floor_no}</h4>
    <h4>Block name: {singleApartment.block_name }</h4>
    <h4>Apartment no: {singleApartment.apartment_no}</h4>
    <h4>Rent: {singleApartment.rent} $USD</h4>
    
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Agreement</button>
    </div>
  </div>
</div>
           
           </>)}
        </div>
        </div>
    );
};

export default Apartment;