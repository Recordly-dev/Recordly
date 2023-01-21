import mongoose from "mongoose";

export default async function initMongo() {
  mongoose.connect(process.env.MONGO_URI, (error) => {
    if (error) {
      console.log("mongodb connect error", error);
    } else {
      console.log("mongodb connect success!");
    }
  });
}
