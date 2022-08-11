const { log, error } = console;
const axios = require("axios");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(morgan("dev"));

const connected = (req, res, next) => {
  log("Connected!");
  next();
};
app.use(connected);

app.get("/:symbol/:interval", async (req, res) => {
  try {
    const { symbol, interval } = req.params;
    // http://localhost:5000/BTCUSDT/1m --> changing currency pair and timeframe on request parameters
    await axios
      .get(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
      )
      .then((response) => response.data) // responds with array of arrays
      .then((klinedata) =>
        klinedata.map((d) => ({
          // map data into needed array of objects format
          time: d[0] / 1000,
          open: d[1] * 1,
          high: d[2] * 1,
          low: d[3] * 1,
          close: d[4] * 1,
        }))
      )
      .then((data) => res.status(200).json(data)); // send data as json
  } catch (err) {
    res.status(500).send(err);
  }
});

// app is listening --> server.js
module.exports = app;
