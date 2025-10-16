import mongoose from "mongoose";
import Review_Data from "../types/review_data";

mongoose.set("strictQuery", false);

const postSchema = new mongoose.Schema<Review_Data>({
    author: {
        type: String,
        minLength: 3,
        maxLength: 30
    },
    content: {
        type: String,
        minLength: 10,
        maxLength: 500
    },
    SP_id: {
        type: String,
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

const Review = mongoose.model<Review_Data>("Post", postSchema);

export default Review;