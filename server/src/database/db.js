
import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const dbConnect = async () => {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        console.error("Error: MONGODB_URI is not defined in the environment variables");
        process.exit(1);  // Exit with failure if the URI is missing
    }

    try {
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected`);
        // ${conn.connection.host}
    } catch (error) {
        console.error(`Connection Error: ${error.message}`);
        process.exit(1);  // Exit process with failure
    }
};

export default dbConnect;
