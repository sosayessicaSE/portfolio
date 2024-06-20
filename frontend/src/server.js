import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for requests from http://localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));

// Define your other Express routes and configurations here
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
