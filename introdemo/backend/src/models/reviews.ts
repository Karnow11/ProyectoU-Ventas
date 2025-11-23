import mongoose from "mongoose";
import Review_Data from "../types/review_data";

mongoose.set("strictQuery", false);

const postSchema = new mongoose.Schema<Review_Data>({
    user_id: {
        type: String,
        required: true
    },
    sp_id: {
        type: String,
        required: true
    },
    qualification: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    content: {
      type: String,
      minLength: 0,
      maxLength: 500
  },
}, {
    timestamps: true 
});

postSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Review = mongoose.model<Review_Data>("Review", postSchema);

export default Review;