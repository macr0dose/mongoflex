import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minlength: [2, 'Name should be at least 2 characters long'],
    maxlength: [100, 'Name should not exceed 100 characters']
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  avatarUrl: {
    type: String, // URL validation can be added separately if needed
  },
  description: {
    type: String,
    minlength: [2, 'Description should be at least 2 characters long'],
    maxlength: [1000, 'Description should not exceed 1000 characters'],
    default: ''
  },
  githubUrl: {
    type: String, // URL validation can be added separately if needed
    default: ''
  },
  linkedInUrl: {
    type: String, // URL validation can be added separately if needed
    default: ''
  },
  // Assuming 'projects' is an array of Project IDs
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
});

// If a User model has already been registered, use that, otherwise create a new one
const User = models.User || model("User", UserSchema);

export default User;
