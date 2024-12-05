import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URL || "mongodb://localhost:27017/books";

const db = mongoose.connect(connectionString);

export default db;
