
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  passwordHash: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, 
    required: true,
    unique: [true, "El username ya está registrado"]},
    passwordHash: {type: String, required: true}
},{ 
  timestamps: true 
});

const User = mongoose.model("User", userSchema);

export default User
