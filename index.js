import express from "express";
import routes from "./Routes/router.js";
import connection from "./Database/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { env } from "process";
const app = express();
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
// Allow Cross-Origin Resource Sharing (CORS)
// app.use(cors({ credentials: true, origin: 'https://emp-app-ca789b749d5f.herokuapp.com' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public/Images" directory
app.use(express.static(path.resolve('public')));

connection();

// Define your routes
app.use('/api', routes);
// We need to tell the Heroku to serve the statics files of the client.



          
    app.use(express.static("./sample_app/build"))
 app.get("*", (req, res) => {
  const path_to_index= path.join('sample_app','build','index.html');
console.log(`./${path_to_index}`);
  res.sendFile(`./${path_to_index}`);
});

 const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("Server running at PORT: " + PORT));
