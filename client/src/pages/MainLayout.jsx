import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function MainLayout(){

    return (

        <div className="flex min-h-screen flex-col overflow-x-hidden">
            <div className="shrink-0">
                <Navbar />
            </div>
            
            <main className="flex-1
                w-full
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
            ">
                <Outlet />
            </main>

            <div className="shrink-0">
                <Footer />
            </div>
        </div>
    )

}


export default MainLayout;