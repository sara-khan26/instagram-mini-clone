const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");


const router = express.Router();


router.get("/", auth, async (req, res) => {
const user = await User.findById(req.userId);


const posts = await Post.find({
user: { $in: user.following }
})
.populate("user", "username")
.sort({ createdAt: -1 });


res.json(posts);
});


module.exports = router;