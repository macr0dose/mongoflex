import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minlength: [2, "Name should be at least 2 characters long"],
    maxlength: [100, "Name should not exceed 100 characters"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[\w.]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  avatarUrl: {
    type: String,
  },
  bio: {
    type: String,
    default: "",
  },
});

// If a User model has already been registered, use that, otherwise create a new one
const User = models.User || model("User", UserSchema);

export default User;
