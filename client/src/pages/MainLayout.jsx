import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function MainLayout({children}){

    return (

        <div className="flex min-h-screen flex-col">
            <div className="shrink-0">
                <Navbar />
            </div>
            
            <main className="flex-1">
                <Outlet />
            </main>

            <div className="shrink-0">
                <Footer />
            </div>
        </div>
    )

}


export default MainLayout;