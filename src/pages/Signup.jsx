import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { username, email, password });
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 409 || 
          error.response?.data?.message?.toLowerCase().includes("exists")) {
        alert("User already exists. Please try logging in.");
      } else {
        alert(error.response?.data?.message || "Signup failed");
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
        Sign Up
      </h2>
      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
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
          Sign Up
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
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "#0095f6",
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: "600",
          }}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
