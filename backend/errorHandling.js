const express = require("express");

const app = express();
const PORT = 5004;

app.use(express.json());

let data = [
  {
    id: 1,
    name: "Lidya",
  },
];

app.get("/data/:id", (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "Invalid Product ID — must be a number." });
    }

    const findId = data.find((uid) => uid.id === parseInt(id));

    if (!findId) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(findId);
  } catch (error) {}
});

app.post("/create", (req, res) => {
  try {
    const { id, name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "missing name" });
    }

    data.push({ id, name });

    res.status(201).json(data);
  } catch (error) {}
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
