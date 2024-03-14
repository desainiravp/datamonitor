<<<<<<< HEAD
const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = 9091;

// Create a Prometheus counter metric
const counter = new promClient.Counter({
    name: 'my_custom_metric_counter',
    help: 'Number of times a specific event occurred',
});

// Route handler for the /metrics endpoint
app.get('/metrics', async (request, response) => {
    response.set('Content-Type', promClient.register.contentType);
    response.send(await promClient.register.metrics());
});

// Route handler for the root endpoint
app.get('/', (req, res) => {
    // Increment the counter for each request to the root endpoint
    counter.inc();

    // Send a response
=======
const http = require('http');

const hostname = '0.0.0.0';
const port = 9091;

const server = http.createServer((req, res) => {
>>>>>>> f70ba8e58261b886aa10e95811a239a573405941
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from port 9091!\n');
});

<<<<<<< HEAD
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

=======
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
>>>>>>> f70ba8e58261b886aa10e95811a239a573405941
