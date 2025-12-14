import api from "../api/axios";

const SuggestedUsers = ({ users, refresh }) => {
  const followUser = async (id) => {
    try {
      await api.post(`/users/follow/${id}`);
      refresh();
    } catch (error) {
      alert("Failed to follow user");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #dbdbdb",
        borderRadius: "8px",
        padding: "15px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
      }}
    >
      <h4 style={{ marginBottom: "15px", color: "#262626" }}>
        Suggested for you
      </h4>

      {users.length === 0 && (
        <p style={{ fontStyle: "italic", color: "#8e8e8e" }}>
          No suggestions available
        </p>
      )}

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <span style={{ fontWeight: "600", color: "#262626" }}>
            {user.username}
          </span>
          <button
            onClick={() => followUser(user._id)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#0095f6",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#007ac1")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#0095f6")}
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default SuggestedUsers;
