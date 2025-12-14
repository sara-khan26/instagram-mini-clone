import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta_upload");
    data.append("cloud_name", "dxd2b5yoj");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxd2b5yoj/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  const submitPost = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please select an image");

    setLoading(true);

    try {
      // 1️⃣ Upload image
      const imageUrl = await uploadImageToCloudinary();

      // 2️⃣ Save post
      await api.post("/posts", { imageUrl, caption });

      alert("Post Created");
      setImage(null);
      setCaption("");
    } catch (err) {
      alert("Failed to create post. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={submitPost}
        style={{
          maxWidth: "400px",
          margin: "40px auto",
          padding: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "0", color: "#262626" }}>
          Create Post
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{
            cursor: "pointer",
            borderRadius: "8px",
            border: "1px solid #dbdbdb",
            padding: "8px",
          }}
        />

        <input
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{
            padding: "12px 14px",
            borderRadius: "8px",
            border: "1px solid #dbdbdb",
            fontSize: "15px",
            outline: "none",
            resize: "vertical",
            minHeight: "60px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: loading ? "#a0cfff" : "#0095f6",
            color: "white",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.backgroundColor = "#007ac1";
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.backgroundColor = "#0095f6";
          }}
        >
          {loading ? "Uploading..." : "Create"}
        </button>
      </form>
    </>
  );
};

export default CreatePost;
