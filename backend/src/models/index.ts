import { model } from "mongoose";

// Start Import Schemas
import UserSchema from "./user.model";
import BookSchema from "./book.model";

// Export Models
export const Books = model("Book", BookSchema)
export const Users = model("User", UserSchema);
