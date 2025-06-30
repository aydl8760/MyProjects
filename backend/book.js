const express = require("express");

const app = express();

const bookIdValidate = (req, res, next) => {
  const bookId = req.params.bookId;
  if (isNaN(bookId)) {
    res.status(400).send("is not allowed");
  }

  next();
};

app.get("/books/:bookId", bookIdValidate, (req, res) => {
  const { bookId } = req.params;
  res.send(`book id ${bookId}`);
});

app.get("/book/:bookId", bookIdValidate, (req, res) => {
  const { bookId } = req.params;
  const available = req.query.ava;

  if (available === "yes") {
    res.send(`${bookId} is available`);
  } else {
    res.status(400).send("is not allowed");
  }
});

app.listen(5003, () => {
  console.log(`server running ${5003}`);
});
