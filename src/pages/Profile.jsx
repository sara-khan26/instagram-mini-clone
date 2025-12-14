import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const userRes = await api.get("/users/me");
      setUser(userRes.data);

      const postRes = await api.get(`/posts/user/${userRes.data._id}`);
      setPosts(postRes.data);
    };

    fetchProfile();
  }, []);

  if (!user) return null;

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          padding: "0 15px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            marginBottom: "30px",
            borderBottom: "1px solid #dbdbdb",
            paddingBottom: "25px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "48px",
              color: "#fff",
              fontWeight: "700",
              userSelect: "none",
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ marginBottom: "8px", color: "#262626" }}>{user.username}</h2>
            <div style={{ display: "flex", gap: "20px", color: "#8e8e8e", fontWeight: "600" }}>
              <span>{user.followers.length} followers</span>
              <span>{user.following.length} following</span>
            </div>
          </div>
        </div>

        <h3
          style={{
            fontWeight: "600",
            borderTop: "1px solid #dbdbdb",
            paddingTop: "15px",
            color: "#262626",
          }}
        >
          My Posts
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {posts.map((post) => (
            <div
              key={post._id}
              style={{
                border: "1px solid #dbdbdb",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <img
                src={post.imageUrl}
                alt="post"
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                  borderBottom: "1px solid #dbdbdb",
                }}
              />
              <div style={{ padding: "12px" }}>
                <p
                  style={{
                    margin: "8px 0",
                    fontSize: "14px",
                    color: "#262626",
                    fontWeight: "600",
                  }}
                >
                  {post.caption}
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "14px",
                    color: "#999",
                    fontWeight: "600",
                  }}
                >
                  ❤️ Likes: {post.likes.length}
                </p>

                <div
                  style={{
                    marginTop: "10px",
                    maxHeight: "100px",
                    overflowY: "auto",
                    borderTop: "1px solid #eee",
                    paddingTop: "8px",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      marginBottom: "8px",
                      color: "#262626",
                    }}
                  >
                    Comments
                  </h4>
                  {post.comments.length === 0 ? (
                    <p style={{ color: "#8e8e8e" }}>No comments yet.</p>
                  ) : (
                    post.comments.map((comment) => (
                      <p
                        key={comment._id}
                        style={{ marginBottom: "6px", fontSize: "14px", color: "#444" }}
                      >
                        <b style={{ color: "#262626" }}>{comment.user.username}:</b>{" "}
                        {comment.text}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
