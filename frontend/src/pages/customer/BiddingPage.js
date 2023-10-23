import Navbar from "./shared/Navbar";
import Footer from "../../components/shared/Footer";

export default function BiddingPage({children}) {
    return (
        <>
            <Navbar />
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    {children}
                </div>
            </section>
            <Footer />
        </>
    );
}