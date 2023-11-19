const User = require("../../models/user");

const updateSubscription = async (req, res, next) => {
  try {
    const subscriptionOptions = ["starter", "pro", "business"];
    const { subscription } = req.body;

    if (!subscriptionOptions.includes(subscription)) {
      return res.status(400).json({ message: "Invalid subscription option" });
    }

    const userToUpdate = await User.findByIdAndUpdate(
      req.user.id,
      { subscription },
      {
        new: true,
      }
    );

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userToUpdate);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateSubscription };
