import { configDotenv } from "dotenv";

configDotenv()

const secretKey=process.env.SECRET_KEY



export {secretKey}