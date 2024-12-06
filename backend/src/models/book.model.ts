import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  author: { type: String, required: true, trim: true }
});

export default BookSchema;
