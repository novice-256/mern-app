
import mongoose from "mongoose";
const mongoDBUrl ="mongodb+srv://hms:hms@cluster0.vxctalo.mongodb.net/?retryWrites=true&w=majority"


export  default async  function connection() {
    try {
        await mongoose.connect(mongoDBUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
      }
}

  