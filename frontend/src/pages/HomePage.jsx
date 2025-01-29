import { useState } from "react";
import { jwtDecode } from "jwt-decode"; // Use the default import like this if Vite handles it correctly
import "./HomePage.css"; // Import the CSS file

const HomePage = () => {
  // State to hold the email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
  setLoading(true);
  setError(""); // Reset error before each attempt
  
    // Prepare the login data
    const loginData = { email, password };
  
    try {
      // Send login request to the backend
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Successfully logged in, store token and role in local storage
        localStorage.setItem("authToken", data.token);
        const decodedToken = jwtDecode(data.token); // Decode the JWT token to get the role
        console.log(decodedToken);
        localStorage.setItem("role", decodedToken.role); // Store the role
  
        // Redirect based on the user's role
        if (decodedToken.role === "admin") {
          window.location.href = "/admin-dashboard"; // Redirect to Admin Dashboard
        } else if (decodedToken.role === "farmer") {
          window.location.href = "/farmer-dashboard"; // Redirect to Farmer Dashboard
        } else {
          window.location.href = "/"; // Default redirect for other roles
        }
  
        alert("Login successful!");
      } else {
        // Handle error response
        setError(data.message || "An error occurred");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1 className="heading">Welcome to GRL Works</h1>
        <p className="description typing">Connect with your community and stay updated.</p>
      </div>
      <div className="right-section">
        <div className="login-box">
          <h2 className="login-heading">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
