import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DbHelper } from './helpers/db';
import { errorHandler } from './middleware/error-handler';
import userRoutes from './users/user.controller';

// Load environment variables
dotenv.config();

// Initialize database and start server
DbHelper.initialize()
  .then(() => {
    startServer();
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });

function startServer() {
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  
  // API routes
  app.use('/users', userRoutes);
  
  // Global error handler
  app.use(errorHandler);
  
  // Start server
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}