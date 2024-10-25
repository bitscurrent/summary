import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()


const allowedOrigins = [
    'http://localhost:5173',
    'chrome-extension://gelacbjlhbehdpcfofhcjdejliodhlhg' // extension origin
  ];
  
  // Configure CORS
  app.use(cors({
    origin:{allowedOrigins
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }));
  
  
  app.use(express.json({ limit: "16kb" })); // To receive json data from body
  app.use(express.urlencoded({ extended: true, limit: "16kb" })); // To receive data from URL
  app.use(cookieParser());
  
  
  // Routes import
  import userRouter from "./src/routers/user.router.js";

  
  // routes declaration
  app.use("/api/v1/users", userRouter);
  


export default app;