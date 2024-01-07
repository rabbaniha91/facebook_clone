import mongoose from "mongoose";

export const connectToDb = async (uri) => {
  try {
    await mongoose.connect(uri, { useNewURlParser: true });
  } catch (error) {
    console.log(error);
  }
};
