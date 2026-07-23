const app = require("./app");
const pool = require("./db");
const http = require("http");
const { initializeSocket } = require("./socket/socket");

const PORT = process.env.PORT || 5000;


// Create HTTP server
const server = http.createServer(app);


// Initialize Socket.IO
initializeSocket(server);


async function startServer() {
  try {

    // Test database connection
    const result = await pool.query("SELECT NOW()");

    console.log("✅ Database Connected Successfully!");
    console.log("Current Time:", result.rows[0].now);


    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });


  } catch (error) {

    console.error("❌ Database Connection Failed!");
    console.error(error.message);

  }
}


startServer();