import mongoose from "mongoose"

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_STRING)
    console.log(`mongodb connected : ${conn.connection.host}`)
  } catch (error) {
    console.log(`mongodb error : ${error}`)
    process.exit(1)
  }
}
