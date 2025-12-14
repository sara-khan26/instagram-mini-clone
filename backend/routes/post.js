const express = require("express");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/user/:userId", auth, async (req, res) => {
  const posts = await Post.find({ user: req.params.userId })
    .sort({ createdAt: -1 })
    .populate("user", "username") // optional: populate user details
    .lean();

  // For each post, fetch comments and populate commenter username
  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const comments = await Comment.find({ post: post._id })
        .populate("user", "username")
        .lean();

      // Include comments on the post object
      return { ...post, comments };
    })
  );

  res.json(postsWithComments);
});

// Create post
router.post("/", auth, async (req, res) => {
  const post = await Post.create({
    user: req.userId,
    imageUrl: req.body.imageUrl,
    caption: req.body.caption,
  });

  res.json(post);
});

// Toggle Like Post
router.post("/:postId/like", auth, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const userId = req.userId;

  const likedIndex = post.likes.findIndex(
    (id) => id.toString() === userId.toString()
  );

  if (likedIndex === -1) {
    // Not liked, so like it
    post.likes.push(userId);
  } else {
    // Already liked, so unlike it
    post.likes.splice(likedIndex, 1);
  }

  await post.save();

  res.json(post);
});

// Add comment
router.post("/:id/comment", auth, async (req, res) => {
  const comment = await Comment.create({
    post: req.params.id,
    user: req.userId,
    text: req.body.text,
  });
  res.json(
    await comment.populate("user", "username") 
  );
});


// Get post with comments
router.get("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", "username")
    .lean();

  const comments = await Comment.find({ post: req.params.id }).populate(
    "user",
    "username"
  );

  post.comments = comments;
  res.json(post);
});
module.exports = router;
