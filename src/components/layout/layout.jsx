import React from 'react';
import Footer from './footer/footer';
import Header from './header/header';

const Layout =({children}) =>{
    return(
        
        <div>
            <Header/>
            <main>{children}</main>
            { <Footer title={"Created by "} description={"ALEX ROZENBAUM"}/> }
        </div>
        
    )
}

export default Layout;