const Comment = ({ comment }) => {
  return (
    <p
      style={{
        margin: "5px 0",
        fontSize: "14px",
        color: "#262626",
        lineHeight: "1.3",
      }}
    >
      <strong style={{ marginRight: "6px" }}>{comment.user.username}:</strong>
      {comment.text}
    </p>
  );
};

export default Comment;
