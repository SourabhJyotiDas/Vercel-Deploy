import mongoose from "mongoose"

export const connectToDatabase = async () => {
      try {
            await mongoose.connect(process.env.MONGOURI);
            console.log("Mongoose Connected Sucessfully");
      } catch (error) {
            console.log(error);
      }
}