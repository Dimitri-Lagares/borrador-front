import React from 'react'
import {Footer} from "./Footer";
import { ResponsiveAppBar } from './AppBar';

export const Home = () => {
  return (
    <div>
      <ResponsiveAppBar/>
      <Footer/>
    </div>
  )
}