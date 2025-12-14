const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Get suggested users
router.get("/suggested", auth, async (req, res) => {
  const me = await User.findById(req.userId);

  const users = await User.find({
    _id: { $ne: req.userId, $nin: me.following },
  }).select("username");

  res.json(users);
});

// Get logged-in user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

// Follow user
router.post("/follow/:id", auth, async (req, res) => {
  try {
    const me = await User.findById(req.userId);
    const userToFollow = await User.findById(req.params.id);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent following yourself
    if (userToFollow._id.equals(me._id)) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    // Check if already following
    if (me.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: "Already following" });
    }

    // Add to following & followers
    me.following.push(userToFollow._id);
    userToFollow.followers.push(me._id);

    await me.save();
    await userToFollow.save();

    res.json({ message: "Followed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Unfollow user
router.post("/:id/unfollow", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  const target = await User.findById(req.params.id);

  user.following = user.following.filter(
    (id) => id.toString() !== target._id.toString()
  );
  target.followers = target.followers.filter(
    (id) => id.toString() !== user._id.toString()
  );

  await user.save();
  await target.save();

  res.json({ message: "Unfollowed" });
});

module.exports = router;
