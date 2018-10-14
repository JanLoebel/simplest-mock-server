# Simplest Mock Server
[![Build Status](https://travis-ci.org/JanLoebel/simplest-mock-server.svg?branch=master)](https://travis-ci.org/JanLoebel/simplest-mock-server)

This is a very simple mock server. Simplify returning static data on http requests.

It supports returning different static files requested with a specific url, method or query-parameters.

Return mock data specified by:

* url (e.g.: `/customer` )
* method (e.g.: `GET`, `POST`)
* query-parameter (e.g.: `?page=2&sort=name,desc`)

## Using the server

1.  Navigate into your MagicMirror's modules folder and execute `git clone https://github.com/JanLoebel/simplest-mock-server.git`
2.  Execute `cd simplest-mock-server` && `npm install` to install the node dependencies
3.  Start the server by executing `npm run watch`
4.  Configure the routes depending on your needs. Therefore open the `config.js`

```js
module.exports = {
  server: {
    port: 3000
  },
  mocks: [
    {
      path: "/test",
      query: "a=true&b=false&c=1",
      responseFile: "./responseFiles/test1.txt",
    },
    {
      path: "/test/2",
      responseFile: "./responseFiles/test2.json"
      method: "POST",
      responseCode: 200
    }
  ];
}
```

## Running the tests

Simplest Mock Server comes bundled with a [Postman](https://www.getpostman.com/) Collection containing some tests to verify everything is working.  
It is run using [Newman](https://www.getpostman.com/docs/postman/collection_runs/command_line_integration_with_newman). These tests are based on the default response files.

Run the tests with:
```
npm test
```

## Configuration options

| Option   | Description                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------- |
| `server` | _Required_ Server configuration, see `Server configuration options`.<br><br>**Type:** `object`<br> |
| `mocks`  | _Required_ Array of mocks, see `Mock configuration options`.<br><br>**Type:** `array`<br>          |

### Server configuration options

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| `port` | _Optional_ Server port to listen.<br><br>**Type:** `int`<br>Default: 3000 |

### Mock configuration options

| Option         | Description                                                                             |
| -------------- | --------------------------------------------------------------------------------------- |
| `path`         | _Required_ Path to listen for requests.<br><br>**Type:** `string`<br>                   |
| `method`       | _Optional_ HTTP-Method to listen for.<br><br>**Type:** `string`<br> Default: `GET`      |
| `query`        | _Optional_ Query-String to match, order is not important.<br><br>**Type:** `string`<br> |
| `responseFile` | _Optional_ Location for the file to return.<br><br>**Type:** `string`<br>               |
| `responseCode` | _Optional_ Response-Code to return. <br><br>**Type:** `int` <br>Default: 200            |

## Contribution

Please feel free to improve or modify the code and send a Pull-Request! Any contribution is very welcome :)

## The MIT License (MIT)

Copyright © 2018 Jan Loebel

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
