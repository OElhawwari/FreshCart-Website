import React from 'react'
import style from './Home.module.css'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import Products from './../Products/Products';
import MainHomeSlider from '../MainHomeSlider/MainHomeSlider';

export default function Home() {

  return <>
      <MainHomeSlider/>
      <CategoriesSlider />
      <Products />

  </>
}
