// Import necessary dependencies
const express = require("express"); // Framework for building web applications and APIs
const mongoose = require("mongoose"); // MongoDB object modeling tool
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing
const dotenv = require("dotenv"); // Loads environment variables from a .env file
const next = require("next"); // React framework with server-side rendering capabilities

// Load environment variables from .env file
dotenv.config();

// Check if the application is running in development mode
const dev = process.env.NODE_ENV !== "production";

// Initialize the Next.js app with the appropriate environment mode
const app = next({ dev });

// Get the Next.js request handler to manage all other routes
const handle = app.getRequestHandler();

// Prepare the Next.js app, then set up the Express server
app.prepare().then(() => {
  const server = express(); // Initialize the Express server

  // Middleware to handle CORS requests and parse incoming JSON data
  server.use(cors()); // Enable Cross-Origin Resource Sharing
  server.use(express.json()); // Parse JSON payloads in HTTP requests

  // Connect to MongoDB using Mongoose with the connection string from the environment variables
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
      useUnifiedTopology: true, // Enable the new MongoDB monitoring and discovery engine
    })
    .then(() => console.log("MongoDB connected")) // Log success message upon successful connection
    .catch((err) => console.log(err)); // Log any errors encountered during the connection

  // Define API routes for authentication and task management
  server.use("/api/auth", require("./routes/Auth")); // Authentication-related routes
  server.use("/api/tasks", require("./routes/tasks")); // Task-related routes

  // Handle all other routes with Next.js, enabling server-side rendering for pages
  server.get("*", (req, res) => {
    return handle(req, res); // Pass the request to Next.js
  });

  // Start the server and listen on the specified port (default: 5001)
  const PORT = process.env.PORT || 5001; // Use the port from the environment or default to 5001
  server.listen(PORT, (err) => {
    if (err) throw err; // Throw an error if the server fails to start
    console.log(`Server running on port ${PORT}`); // Log the success message
  });
});
