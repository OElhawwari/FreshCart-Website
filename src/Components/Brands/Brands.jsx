import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading.jsx';

export default function Brands() {

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);



  async function getBrands() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      setBrands(data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { getBrands() }, [])

  return <>
    <div className="container py-10">
      <h2 className="text-center text-main font-bold text-4xl">All Brands</h2>
      {loading ? <Loading/> :
        <div className="container flex flex-wrap justify-center items-center mt-10 mx-auto gap-8 ">
          {brands.map(brands => (
            <>
              <div key={brands.id} className="lg:w-1/5 w-10/12 flex flex-col items-center  border border-gray-300 rounded-md p-14 text-center hover:shadow-sm hover:shadow-main transition-all duration-300">
                <figure className='py-10'><img src={brands.image} alt="image" /></figure>
                <figcaption>{brands.name}</figcaption>
              </div>
            </>
          ))}

        </div>
      }


    </div>

  </>
}