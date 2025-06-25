const express = require("express");

const app = express();
const PORT = 5005;

app.use(express.json());

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Smartphone" },
];

app.get("/products/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res
        .status(400)
        .json({ message: "Invalid Product ID — must be a number." });
    }

    const product = products.find((p) => p.id === productId);

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error — something went wrong!" });
  }
});

app.use((_, res) => {
  res.status(404).send("Route Not Found");
});

const errorHandling = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Internal Server Error — Something broke!" });
};

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});
