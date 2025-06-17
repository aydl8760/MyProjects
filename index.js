const express = require("express");

const app = express();
const PORT = 5001;

const users = [
  { id: 1, name: "Sara" },
  { id: 2, name: "Mekdes" },
  { id: 3, name: "Liya" },
];

app.get("/contact", (req, res) => {
  res.send("Call at +21234567 ");
});

app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      product: "apple",
    },
    {
      id: 2,
      product: "android",
    },
    {
      id: 3,
      product: "ios",
    },
  ]);
});

app.get("/service", (req, res) => {
  res.json([
    {
      id: 1,
      service: "contact",
    },
    {
      id: 2,
      service: "call",
    },
  ]);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === parseInt(id));
  console.log(user);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.use((_, res) => {
  res.status(404).send("Route Not Found");
});

app.listen(PORT, () => {
  console.log(`server satrted ${PORT}`);
});
