const User = require("../models/User.js");
const frienController = {
  toggleFriend: async (req, res) => {
    const { id, friendid } = req.body;
    const user = await User.findOne({ _id: id });
    const friend = await User.findOne({ _id: frienController });
    if (!user) {
      return res.status(400).json({ message:"invalid user" });
    } else if (!friend) {
      return res.status(400).json({ message:"invalid friend" });
        }
        if (user.friends.includes(friend._id)) {
            
        }
  },
};
