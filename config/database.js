import mongoose from "mongoose"

export const connectToDatabase = async () => {
      try {
            await mongoose.connect("mongodb://localhost:27017/verceldeploy");
            console.log("Mongoose Connected Sucessfully");
      } catch (error) {
            console.log(error);
      }
}