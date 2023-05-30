import React from 'react';
import s from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Wrapper from '../Wrapper/Wrapper';
const Layout = ({active, finished}) => {
 
    return (
        <>
            <Header/>
                <Wrapper>
                    <Outlet/>
                </Wrapper>
            <Footer active={active} finished={finished}/>
        </>
    )
}

export default Layout