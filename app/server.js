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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from port 9091!\n');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


