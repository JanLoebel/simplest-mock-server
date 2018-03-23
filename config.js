module.exports = {
  server: {
    port: 3000
  },
  mocks: [
    {
      path: "/test",
      query: "a=true&b=false&c=1",
      responseFile: "./response_files/test1.txt"
    },
    {
      path: "/test/2",
      responseFile: "./response_files/test2.json"
    },
    {
      path: "/test3",
      responseFile: "./response_files/test3.html"
    },
    {
      path: "/test4",
      query: "areYouSure=yes",
      responseFile: "./response_files/test4.xml"
    },
    {
      path: "/test5",
      method: "POST",
      responseCode: 201
    }
  ]
};
