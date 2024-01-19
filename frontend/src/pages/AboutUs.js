import NavBar from "../components/NavBar";
import Footer from "../components/footer";
import "../components/App.css";
export default function Help() {
    return (
        <div>
            <NavBar/>
            <div classname="main">
                <h1>About Us</h1>
                <p>Please note that this is a Semester Project for education purposes and not a fully developed website with all the intended features. 
                All the details and information on this website, except this page, are fictitious and not real. 
                We kindly request that you refrain from attempting to donate or make any transactions via the QR code provided on the "donate-money" page.</p>
                <p>For further information, feel free to contact us via email:</p>

                <p>Ha Thuy Chi - s3930417@rmit.edu.vn</p>
                <p>Dang Ha - s3924594@rmit.edu.vn</p>
                <p>Duong - s3927233@rmit.edu.vn</p>
                <p>Nhat Nguyen Minh - s3924871@rmit.edu.vn</p>
                <p>Duc Anh - s3877340@rmit.edu.vn</p>
            </div>
            <Footer/>
        </div>
    )
}