const express = require("express");

const app = express();
const PORT = 3000;

const moviesRoutes = require("./routes/movies.routes");

app.use(express.json());

app.use("/movies", moviesRoutes);

app.get("/", (req, res) => {
  res.send("Server is running. Use /movies to access the movie API.");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});