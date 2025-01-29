import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src="/grl.png" alt="Logo" className="logo" />
                <span className="company-name">Milk Analysis</span>
            </div>
            <div className="button-container">
                <button className="nav-button">Home</button>
                <button className="nav-button">About</button>
                <button className="nav-button">Register</button>
                
            </div>
        </nav>
    );
};

export default Navbar;
