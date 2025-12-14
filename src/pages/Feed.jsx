import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
import SuggestedUsers from "../components/SuggestedUsers";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [suggested, setSuggested] = useState([]);

  const loadFeed = async () => {
    const feedRes = await api.get("/feed");
    setPosts(feedRes.data);

    const userRes = await api.get("/users/suggested");
    setSuggested(userRes.data);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          maxWidth: "1200px",
          margin: "20px auto",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {/* FEED */}
        <div
          style={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {posts.length === 0 && <p>No posts in feed.</p>}
          {posts.map((post) => (
            <PostCard key={post._id} post={post} refresh={loadFeed} />
          ))}
        </div>

        {/* SUGGESTED USERS */}
        <div
          style={{
            flex: 1,
            border: "1px solid #dbdbdb",
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#fff",
            height: "fit-content",
          }}
        >
          <h3
            style={{
              fontWeight: "600",
              borderBottom: "1px solid #dbdbdb",
              paddingBottom: "8px",
              marginBottom: "12px",
              color: "#262626",
            }}
          >
            Suggested Users
          </h3>
          <SuggestedUsers users={suggested} refresh={loadFeed} />
        </div>
      </div>
    </>
  );
};

export default Feed;
