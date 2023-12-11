import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required!'],
    minlength: [3, 'Title should be at least 3 characters long']
  },
  description: {
    type: String,
    required: [true, 'Description is required!']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required!']
  },
  liveSiteUrl: String,
  githubUrl: String,
  category: {
    type: String,
    required: [true, 'Category is required!']
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required!']
  }
});

// If a Project model has already been registered, use that, otherwise create a new one
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
