const app = require("express")();
const cors = require("cors");
const config = require("./config");
const helper = require("./helper");

// For each configuration
config.mocks.forEach(mock => {
  // Register handler for each configuration (GET is default)
  const method = mock.method || "get";
  app[method.toLowerCase()](mock.path, function(req, res) {
    // Check if queries are set at all
    if (mock.query) {
      if (helper.containsSameQueryParameter(mock.query, req.query)) {
        // Return response if query parameter are exactly the same
        return helper.writeResponse(res, mock);
      }
    } else {
      // Return the response anyway, because no query parameter are set so only path counts
      return helper.writeResponse(res, mock);
    }

    // Send not found
    res.writeHead(404);
    res.end();
  });
});

// Add CORS
app.use(cors());

// Start to listen
const port = config.server.port || 3000;
console.log("Server started on Port:", port);
app.listen(port);
