import NavBar from "../components/NavBar";
import Footer from "../components/footer";

export default function Help() {
    return (
        <div class="App">
            <div className="Header"><NavBar/></div>
            <div className="Content">
            <h1>About Us</h1>
            <div className="text-container">
                <p>Please note that this is a Semester Project for education purposes and not a fully developed website with all the intended features. 
                All the details and information on this website, except this page, are fictitious and not real.</p>
                <p>For further information, feel free to contact us via email:</p>

                <p>Chi Ha - s3930417@rmit.edu.vn</p>
                <p>Ha Nguyen - s3924594@rmit.edu.vn</p>
                <p>Duong Don- s3927233@rmit.edu.vn</p>
                <p>Nhat Nguyen - s3924871@rmit.edu.vn</p>
                <p>Anh Hoang - s3877340@rmit.edu.vn</p>
            </div>
            </div>
            <div className="Footer"><Footer/></div>
        </div>
    )
}