import express from "express";
import routes from "./Routes/router.js";
import connection from "./Database/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { env } from "process";
const app = express();

// Allow Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public/Images" directory
app.use(express.static(path.resolve('public')));

connection();

// Define your routes
app.use('/api/', routes);

// Serve static files in production
const __dirname = path.resolve('sample_app');
  app.use(express.static(path.join(__dirname, "build")));
      console.log("NODE_ENV is true ")
  app.get("*", (req, res) => {
      console.log("* route hitting")
    res.sendFile('index.html', { root: path.join(__dirname, "build") });
  });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server running at PORT: " + PORT));
