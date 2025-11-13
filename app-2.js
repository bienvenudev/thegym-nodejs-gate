const express = require("express");
const app = express();

app.get("/", (req, res) => {
  let convertedAmount = null;
  const amountQuery = req.query.amount;
  const currencyQuery = req.query.currency;

  console.log(amountQuery, currencyQuery);

  if (currencyQuery === "usd") {
    convertedAmount = amountQuery * 1450;
  } else if (currencyQuery === "eur") {
    convertedAmount = amountQuery * 1682;
  } else if (currencyQuery === "gbp") {
    convertedAmount = amountQuery * 1907;
  } else {
    return res.status(400).send("missing amount or currency query!");
  }
  res.json({
    input: { amount: amountQuery, currency: currencyQuery },
    convertedAmount,
    unit: "RWF",
  });
});

app.listen("3000");
