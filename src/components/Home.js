import React from 'react';
import Navbar from './Navbar'
import Banner from './Banner'
import HowItWorks from './HowItWorks'
import Footer from './Footer'

const Home = () => {
    return (
        <div>
        <Navbar/>
        <Banner/>
        <HowItWorks/>
        <Footer />
        </div>
    )
}

export default Home