import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, '.env')
})
connectDB()
.then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB CONNECTION failed!",err)
})