import mongoose from "mongoose";

interface IUser {
  id: string;
  name: string;
  passwordHash: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, unique: [true, "este nombre de usuario ya está ocupado"] },
  passwordHash: { type: String, required: true}
});

const User = mongoose.model("User", userSchema);

userSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: {
      id?: string;
      _id?: mongoose.Types.ObjectId;
      __v?: number;
      passwordHash?: string;
    }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default User;
