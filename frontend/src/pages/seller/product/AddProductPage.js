import Navbar from "../shared/Navbar";
import Footer from "../../customer/shared/Footer";
import SideBar from "../shared/SideBar";

export default function AddProductPage() {
    return (
        <>
            <Navbar />
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className={'row'}>
                        <div className={'col-md-3 col-sm-5'}>
                            <SideBar />
                        </div>
                        <div className={'col-md-9 col-sm-7'}>

                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}