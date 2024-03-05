import dotenv from 'dotenv/config.js';
import express from "express"; 
import morgan from "morgan";
import cors from "cors"; 
import userRouter from "./routes/user.js";  
import bodyParser from 'body-parser';  



const app = express();

app.use(express.json());
app.use(express.text());
app.use(morgan("dev"));
app.use(cors());  

app.use(bodyParser.urlencoded({ extended: true }));
 



app.get("/status" , (req, res, next) => {
    res.status(200).json({ message: "server is connected"});
});



app.use("/api/user", userRouter); 


const PORT = process.env.PORT;
app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on ${PORT} port`);
});
console.log(`Server is running on ${PORT} port`);