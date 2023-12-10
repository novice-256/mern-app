import express from "express";
import routes from "./Routes/router.js";
import connection from "./Database/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { env } from "process";
const app = express();

// Allow Cross-Origin Resource Sharing (CORS)
app.use(cors({ credentials: true, origin: 'https://emp-app-ca789b749d5f.herokuapp.com' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public/Images" directory
app.use(express.static(path.resolve('public')));

connection();

// Define your routes
app.use('/api/', routes);
// We need to tell the Heroku to serve the statics files of the client.
      const __dirname = path.resolve('sample_app');
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.jon(__dirname,"build")))
    app.get("*",(req,res)=>{
         res.sendFile('index.html', { root: __dirname });
// res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })
}
 const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("Server running at PORT: " + PORT));
