import Navbar from "@/Components/Navbar";
import Homepage from "@/Components/Homepage";
import Footer from "@/Components/Footer";


const Page = () => {
   return (
        <div>
            <Navbar isAuthenticated={true}/>
            <Homepage />
            <Footer />
        </div>
    );
}

export default Page;