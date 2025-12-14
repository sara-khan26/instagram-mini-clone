import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Comment from "../components/Comment";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");

  const loadPost = async () => {
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
  };

  const addComment = async () => {
    if (!text.trim()) return alert("Comment can't be empty");
    await api.post(`/posts/${id}/comment`, { text });
    setText("");
    loadPost();
  };

  useEffect(() => {
    loadPost();
  }, []);

  if (!post) return null;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 15px",
      }}
    >
      <img
        src={post.imageUrl}
        alt="Post"
        style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
      />
      <p
        style={{
          fontWeight: "600",
          fontSize: "18px",
          marginBottom: "15px",
          color: "#262626",
        }}
      >
        {post.caption}
      </p>

      <div
        style={{
          borderTop: "1px solid #dbdbdb",
          paddingTop: "15px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginBottom: "10px", color: "#262626" }}>Comments</h3>
        {post.comments.length === 0 && (
          <p style={{ color: "#8e8e8e", fontStyle: "italic" }}>No comments yet.</p>
        )}
        {post.comments.map((c) => (
          <Comment key={c._id} comment={c} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          style={{
            flexGrow: 1,
            padding: "10px 12px",
            borderRadius: "20px",
            border: "1px solid #dbdbdb",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <button
          onClick={addComment}
          style={{
            backgroundColor: "#0095f6",
            border: "none",
            borderRadius: "20px",
            color: "white",
            padding: "10px 16px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
