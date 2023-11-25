import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(
   cors({
      origin: ["*"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
   })
);

app.get('/', async (req, res) => {
   res.send("<h1>Working Fine</h1>")
});

import user from "./routes/user.js"

app.use("/api/v1", user)

export default app;