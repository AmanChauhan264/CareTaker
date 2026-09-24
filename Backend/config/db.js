import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI || mongoURI.includes("YOUR_MONGODB")) {
    console.warn("\n========================================================");
    console.warn("⚠️  WARNING: MONGO_URI is missing or still has placeholder value.");
    console.warn("Please provide your MongoDB Atlas connection string in Backend/.env");
    console.warn("Example: MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/caretaker");
    console.warn("========================================================\n");
    return;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
  }
};

export default connectDB;
