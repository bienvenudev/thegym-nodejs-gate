const express = require("express");
const app = express();
const responseTime = require("response-time");

// 1st solution using requestLogger middleware
/*
function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const end = Date.now();
    const responseTime = end - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - ${responseTime}ms`
    );
  });
  next();
}

app.use(requestLogger);
*/

// 2nd solution using response-time package
app.use(
  responseTime((req, res, time) => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${
        req.url
      } - ${time.toFixed()}ms`
    );
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the homepage!" });
});

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Bob" },
    { id: 2, name: "Sarah" },
  ]);
});

app.listen(4000);
