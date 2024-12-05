import { model } from "mongoose";

// Start Import Schemas
import UserSchema from "./user.model";

// Export Models
export const Users = model("User", UserSchema);
