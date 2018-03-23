const fs = require("fs");

function isEqualIgnoreCase(input1, input2) {
  return input1.toLowerCase() === input2.toLowerCase();
}

function isQueryEqual(query1, query2) {
  const q1 = query1.toLowerCase();
  const q2 = query2.toLowerCase();

  if (encodeURIComponent(q1) === q2 || q1 === encodeURIComponent(q2)) {
    return true;
  }

  if (decodeURIComponent(q1) === q2 || q1 === decodeURIComponent(q2)) {
    return true;
  }

  return q1 === q2;
}

function containsSameQueryParameter(queryParameterString, requestQueries) {
  const queries = queryParameterString.split("&");
  const foundQueries = [];

  // Loop over all recieved queries
  Object.keys(requestQueries).forEach(queryKey => {
    for (var i = 0; i < queries.length; i++) {
      const configQuery = queries[i].split("=");
      const configQueryKey = configQuery[0];
      const configQueryValue = configQuery[1];
      // Keys are equal
      if (isEqualIgnoreCase(configQueryKey, queryKey)) {
        // Value is equal
        if (isQueryEqual(configQueryValue, requestQueries[queryKey])) {
          foundQueries.push(queryKey);
        }
      }
    }
  });

  return foundQueries.length === queries.length;
}

function writeFile(httpResponse, filePath) {
  if (filePath.toLowerCase().endsWith(".json")) {
    return _writeFile(httpResponse, filePath, "application/json");
  } else if (filePath.toLowerCase().endsWith(".html")) {
    return _writeFile(httpResponse, filePath, "text/html");
  } else if (filePath.toLowerCase().endsWith(".xml")) {
    return _writeFile(httpResponse, filePath, "application/xml");
  }

  // Fallback is to write plain text
  return _writeFile(httpResponse, filePath, "text/plain");
}

function _writeFile(httpResponse, filePath, type) {
  fs.readFile(filePath, "utf8", function(err, data) {
    httpResponse.contentType(type);
    httpResponse.end(data);
  });
}

function writeResponse(httpResponse, config) {
  // Response code can be written
  if (config.responseCode) {
    httpResponse.writeHead(config.responseCode);
  }

  // If there is a config file set use that file
  if (config.responseFile) {
    return writeFile(httpResponse, config.responseFile);
  } else {
    // Close response if no file was given
    httpResponse.end();
  }
}

module.exports = {
  isEqualIgnoreCase: isEqualIgnoreCase,
  isQueryEqual: isQueryEqual,
  writeResponse: writeResponse,
  containsSameQueryParameter: containsSameQueryParameter
};
