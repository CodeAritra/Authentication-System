import { InferSchemaType, model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

type IUser = InferSchemaType<typeof userSchema>;

export default model<IUser>("User", userSchema);
