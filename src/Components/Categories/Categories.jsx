import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading';

export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);
  const [subCategoriesModal, setSubCategoriesModal] = useState(false);


  const handleCardClick = (id) => {
    getSubCategories(id);
    setTimeout(() => {
    } , 4000)
    setSubCategoriesModal(true);
  };

  const handleClose = () => {
    setSubCategoriesModal(false);
    setSubCategories([])


  };

  async function getSubCategories(mainId) {
    try {
      setSubCategoriesLoading(true);

      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${mainId}/subcategories`)
      setSubCategories(data.data)
      console.log(data.data)
      setSubCategoriesLoading(false);

    } catch (error) {
      console.log(error)
    }
  }


  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { getCategories() }, [])

  return <>
    <div className="container py-10">
      {loading ? <Loading /> :

        <div className="container flex flex-wrap justify-center items-center mx-auto gap-8 ">
          {categories.map(categories => (
            <>

              <div onClick={() => handleCardClick(categories._id)} className="w-full hover:shadow-md hover:shadow-main transition-all duration-300 max-w-sm flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    className="w-96 h-96 object-cover p-8 rounded-t-lg"
                    src={categories.image}
                    alt="Categories image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-main dark:text-white">{categories.name}</h5>
                  </a>
                </div>
              </div>

            </>

          ))}

        </div>
      }


    </div>

    <div className="container py-5 flex flex-wrap justify-center items-center mx-auto gap-8">
      {subCategoriesLoading ?
      
      <Loading/> : ((subCategoriesModal) && 
        <> 
          <div
            id="popup-modal"
            className="bg-gray-800 bg-opacity-80 fixed top-0 right-0 left-0 z-50 flex flex-row flex-wrap justify-center items-center w-full h-screen"
          >
            <div className="relative p-4 w-full max-w-md">
              <div className="bg-white rounded-lg shadow-sm flex flex-col items-center"> 
                <div className=" text-center flex flex-wrap justify-center items-center space-x-2">

                {
                    subCategories.map(subCategories => (<>

                      <div
                      className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" >

                        <div className="px-5 py-5">
                          <h5 className="text-xl font-semibold tracking-tight text-main dark:text-white">{subCategories.name}</h5>

                        </div>
                      </div>

                    </>))}
                    

                </div>
                <button
                  onClick={handleClose}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 w-1/2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          
        </>
      )

      }
    </div>

  </>
}

