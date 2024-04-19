const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    status: {
      type: Number,
      default: 4,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRoles'
    },
  },
  {
    timestamps: true,
  }
);

// statuses
// -4 Unauthorized
// 0 Pending
// 4 Approved

module.exports = mongoose.model("User", userSchema);
