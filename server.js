// Import the app module
const app = require('./app');

// Define the port to run the server on
const port = 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
