
import "./Footer.css"; // Import the CSS file
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social icons

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Left Section - Address & Contact */}
                <div className="footer-left">
                    <h3>GRL Milk Analysis</h3>
                    <p>123, Dairy Road, Chandigarh, India</p>
                    <p>&#9993; contact@grlmilk.com</p>
                    <p>&#9742; +91 98765 43210</p>
                </div>
                <div className="footer-bottom">
                    <p>© 2022 GRL Milk Analysis, All Rights Reserved | Website Designed & Developed by : GamifyWave</p>
                </div>
                {/* Right Section - Social Media Icons */}
                <div className="footer-right">
                    <a href="#" className="social-icon"><FaFacebook /></a>
                    <a href="#" className="social-icon"><FaTwitter /></a>
                    <a href="#" className="social-icon"><FaInstagram /></a>
                    <a href="#" className="social-icon"><FaLinkedin /></a>
                </div> 
            </div>
            
        </footer>
    );
};

export default Footer;
