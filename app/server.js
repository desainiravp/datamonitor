const express = require('express');
const promClient = require('prom-client');

const app = express();
const PORT = 9091;

// Create a Prometheus registry
const register = new promClient.Registry();

// Register a counter metric
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status_code'],
  registers: [register]
});

// Increment the counter for each incoming HTTP request
app.use((req, res, next) => {
  httpRequestCounter.inc({ method: req.method, status_code: res.statusCode });
  next();
});

// Expose metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

