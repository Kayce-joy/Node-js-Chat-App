const express = require("express"); // Import Express
const app = express(); // Create the Express app
const port = 4000; // Use port 4000 for the server

// Set the folder for template files
app.set("views", __dirname + "/templates"); // Changed from 'views' to 'templates'
app.set("view engine", "pug"); // Use 'pug' as the template engine
app.engine("pug", require("pug").__express); // Set up the Pug engine

// Set up the homepage route
app.get("/", (req, res) => {
    res.render("index"); // Render index.pug from the templates folder
});

// Serve static files from the "static" folder
app.use(express.static(__dirname + "/static")); // Changed from 'public' to 'static'

// Start the server and listen on the specified port
const server = app.listen(port, () => {
    console.log(`Node.js is running on port ${port}`);
});

// Integrate Socket.IO for real-time communication
const io = require("socket.io")(server); // Corrected Socket.IO integration

// Set up Socket.IO connection
io.on('connection', function(socket) {
    console.log('A user connected');
    
    // Listen for 'send' event and broadcast the message to all clients
    socket.on('send', function(data) {
        console.log('Message received:', data.message); // Check if the server receives the message
        io.emit('message', data);  // Send the message to all connected clients
    });

    // Handle disconnections
    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });
});
