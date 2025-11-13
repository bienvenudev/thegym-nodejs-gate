const express = require("express");
const app = express();

const conversion = {
  usd: 1450,
  eur: 1682,
  gbp: 1907,
};

app.get("/convert", (req, res) => {
  const currencyQuery = req.query.currency;

  if (!currencyQuery) return res.status(400).send("missing currency query!");

  if (!conversion[currencyQuery])
    return res
      .status(400)
      .send("invalid currency query. currencies available: usd, eur and gbp!");

  if (!req.query.amount) return res.status(400).send("missing amount query!");

  const amountQuery = Number(req.query.amount);

  if (isNaN(amountQuery)) {
    return res.status(400).send("invalid amount query!");
  }

  if (amountQuery <= 0) {
    return res.status(400).send("amount must be positive!");
  }

  const convertedAmount = amountQuery * conversion[currencyQuery];

  res.json({
    input: { amount: amountQuery, currency: currencyQuery },
    convertedAmount,
    unit: "RWF",
  });
});

app.listen("3000");
