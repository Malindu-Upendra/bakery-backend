const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserRoles", userRoleSchema);
