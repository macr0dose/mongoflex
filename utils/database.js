import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('=> MongoDB already connected');
    return;
  }
  
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log('=> MongoDB connected');
  }
  catch (err) {
    console.log(err);
  }
}