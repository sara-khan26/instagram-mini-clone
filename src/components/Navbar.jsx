import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "12px 20px",
        borderBottom: "1px solid #dbdbdb",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", gap: "20px", fontWeight: "600", fontSize: "16px" }}>
        <Link
          to="/feed"
          style={{ textDecoration: "none", color: "#262626" }}
          onMouseOver={(e) => (e.target.style.color = "#0095f6")}
          onMouseOut={(e) => (e.target.style.color = "#262626")}
        >
          Feed
        </Link>
        <Link
          to="/create"
          style={{ textDecoration: "none", color: "#262626" }}
          onMouseOver={(e) => (e.target.style.color = "#0095f6")}
          onMouseOut={(e) => (e.target.style.color = "#262626")}
        >
          Create
        </Link>
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "#262626" }}
          onMouseOver={(e) => (e.target.style.color = "#0095f6")}
          onMouseOut={(e) => (e.target.style.color = "#262626")}
        >
          Profile
        </Link>
      </div>

      <button
        onClick={logout}
        style={{
          padding: "8px 16px",
          backgroundColor: "#ef5350",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ef5350")}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
