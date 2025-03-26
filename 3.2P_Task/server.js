const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const quotes = [
  "Believe you can and you're halfway there.",
  "Every moment is a fresh beginning.",
  "Turn your wounds into wisdom.",
  "Do what you can with what you have.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The best way to get started is to quit talking and begin doing."
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/quote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
