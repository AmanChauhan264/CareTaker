import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
const allowedOrigins = [
  process.env.DOMAIN || "http://localhost:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy blocked this request"));
    },
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({
    name: "CARETAKER API",
    version: "1.0.0",
    status: "active",
    endpoints: {
      health: "/api/health",
    },
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const dbState = dbStates[mongoose.connection.readyState] || "unknown";

  res.status(200).json({
    status: "ok",
    message: "CareTaker API is running",
    timestamp: new Date().toISOString(),
    database: {
      status: dbState,
      readyState: mongoose.connection.readyState,
    },
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 CareTaker Server is running on port ${PORT}`);
  console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
});

export default app;
