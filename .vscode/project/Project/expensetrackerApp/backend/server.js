const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let transactions = [];

app.get("/transactions", (req, res) => {
  res.json(transactions);
});

app.post("/transactions", (req, res) => {
  transactions.push(req.body);
  res.json({ message: "Transaction added" });
});

app.delete("/transactions/:index", (req, res) => {
  transactions.splice(req.params.index, 1);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
