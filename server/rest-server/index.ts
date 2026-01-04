/**
 * Express REST API Server
 * Runs on http://localhost:3000/api
 */

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swagger.js';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve as any, swaggerUi.setup(swaggerSpec) as any);

// Serve OpenAPI spec as JSON
app.get('/api/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'TypeScript Demo REST API',
    endpoints: {
      docs: `http://localhost:${PORT}/api-docs`,
      spec: `http://localhost:${PORT}/api/swagger.json`,
      users: `http://localhost:${PORT}/api/users`,
      posts: `http://localhost:${PORT}/api/posts`,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 REST API Server ready at: http://localhost:${PORT}/api`);
  console.log(`📚 Swagger UI available at: http://localhost:${PORT}/api-docs`);
  console.log(`📄 OpenAPI spec available at: http://localhost:${PORT}/api/swagger.json`);
  console.log(`\n💡 Try running: npm run generate:rest (from root) to generate types\n`);
});

