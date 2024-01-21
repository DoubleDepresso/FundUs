import NavBar from "../components/NavBar";
import Footer from "../components/footer";

export default function Help() {
    return (
        <div class="App">
            <div className="Header"><NavBar/></div>
            <div className="Content">
            <h1>About Us</h1>
            <div className="text-container">
                <p>FundUs is a crowdfunding web application, which helps people struggling with financial issues. 
                Campaigns are hosted by individuals or businesses who pitch a project, idea, or product and provide a financial goal and deadline. 
                People that feel empathy towards those are in need can make a donation to the campaign hosted on our website.</p>
                <br/>
                <p>Our goal is to disseminate the idea that everyone has the right to live with dignity and respect. 
                We can improve the lives of those who most need it by working together, with everyone's help.</p>
                <br/>
                <p>Please note that this is a Semester Project for education purposes and not a fully developed website with all the intended features. 
                Most the details and information on this website, are fictitious and not real.</p>
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