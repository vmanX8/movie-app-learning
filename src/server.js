require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const moviesRoutes = require("./routes/movies.routes");
const authRoutes = require("./routes/auth.routes");

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === "production"
    ? ["https://your-vercel-frontend-url.vercel.app"] // Replace with your actual Vercel URL
    : ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(authRoutes);
app.use("/movies", moviesRoutes);

app.get("/", (req, res) => {
  res.send("Server is running. Use /movies to access the movie API.");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});