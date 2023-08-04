import mongoose from "mongoose";

export default async() => {
    const config = useRuntimeConfig();
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('db connected.');
    } catch (error) {
        console.log(error);
    }
}