import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/feed");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "24px",
          color: "#262626",
          fontWeight: "700",
        }}
      >
        Login
      </h2>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "12px 14px",
            borderRadius: "8px",
            border: "1px solid #dbdbdb",
            fontSize: "15px",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#a8a8a8")}
          onBlur={(e) => (e.target.style.borderColor = "#dbdbdb")}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "12px 14px",
            borderRadius: "8px",
            border: "1px solid #dbdbdb",
            fontSize: "15px",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#a8a8a8")}
          onBlur={(e) => (e.target.style.borderColor = "#dbdbdb")}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#0095f6",
            color: "white",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#007ac1")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0095f6")}
        >
          Login
        </button>
      </form>
      
      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#262626",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/signup"
          style={{
            color: "#0095f6",
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: "600",
          }}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        >
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
