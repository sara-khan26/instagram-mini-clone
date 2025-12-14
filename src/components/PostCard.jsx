import { useState, useEffect } from "react";
import api from "../api/axios";

const PostCard = ({ post, refresh, currentUserId }) => {
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const isLiked = post.likes.some(
      (id) => id.toString() === currentUserId?.toString()
    );
    setLiked(isLiked);

    // Fetch comments for this post
    const fetchComments = async () => {
      try {
        const res = await api.get(`/posts/${post._id}`);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };

    fetchComments();
  }, [post._id, post.likes, currentUserId]);

  const toggleLike = async () => {
    try {
      const res = await api.post(`/posts/${post._id}/like`);
      setLikesCount(res.data.likes.length);
      const isLikedNow = res.data.likes.some(
        (id) => id.toString() === currentUserId?.toString()
      );
      setLiked(isLikedNow);
      if (refresh) refresh();
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await api.post(`/posts/${post._id}/comment`, {
        text: newComment,
      });
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
      if (refresh) refresh();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #dbdbdb",
        borderRadius: "8px",
        margin: 10,
        padding: 15,
        backgroundColor: "#fff",
        maxWidth: "600px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0", color: "#262626" }}>
        {post.user.username}
      </h4>
      <img
        src={post.imageUrl}
        width="100%"
        alt="post"
        style={{ borderRadius: "8px", marginBottom: "10px" }}
      />
      <p style={{ fontSize: "15px", color: "#262626", marginBottom: "10px" }}>
        {post.caption}
      </p>

      <p
        style={{
          fontWeight: "600",
          color: liked ? "#ed4956" : "#262626",
          marginBottom: "15px",
        }}
      >
        ❤️ {likesCount}{" "}
        <button
          onClick={toggleLike}
          style={{
            marginLeft: "10px",
            padding: "5px 12px",
            borderRadius: "20px",
            border: "1px solid #dbdbdb",
            cursor: "pointer",
            backgroundColor: liked ? "#ffe5e9" : "#fff",
            color: liked ? "#ed4956" : "#262626",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          {liked ? "Unlike" : "Like"}
        </button>
      </p>

      <div style={{ borderTop: "1px solid #dbdbdb", paddingTop: "10px" }}>
        <h5 style={{ margin: "0 0 10px 0", color: "#262626" }}>Comments</h5>
        {comments.length === 0 && (
          <p style={{ fontStyle: "italic", color: "#8e8e8e" }}>No comments yet</p>
        )}

        {comments.map((comment) => (
          <p
            key={comment._id}
            style={{ margin: "6px 0", fontSize: "14px", color: "#262626" }}
          >
            <b>{comment.user.username}:</b> {comment.text}
          </p>
        ))}

        <form
          onSubmit={submitComment}
          style={{ marginTop: "10px", display: "flex", gap: "8px" }}
        >
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              flexGrow: 1,
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid #dbdbdb",
              outline: "none",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
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
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
