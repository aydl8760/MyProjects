const express = require("express");

const app = express();
const PORT = 5001;

app.use(express.json());

const users = [
  { id: 1, name: "Sara" },
  { id: 2, name: "Mekdes" },
  { id: 3, name: "Liya" },
];

const products = [
  { id: 1, name: "Laptop", price: 3000 },
  { id: 2, name: "Phone", price: 2000 },
  { id: 3, name: "Headphones", price: 850 },
];

app.get("/contact", (req, res) => {
  res.send("Call at +21234567 ");
});

app.get("/product", (req, res) => {
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

app.get("/profile", (req, res) => {
  res.json({
    name: "Marta",
    age: "22",
  });
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);

  res.json({
    message: "new user created successfully",
    users,
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const createdUser = req.body;

  const idIndex = users.findIndex((uid) => uid.id === parseInt(id));

  if (idIndex !== -1) {
    users[idIndex] = createdUser;
    res.json({
      message: "updated ",
      users,
    });
  } else {
    res.status(404).send("id Not Found");
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((uid) => uid.id === parseInt(id));
  if (index !== -1) {
    const removedId = users.splice(index, 1);
    res.json({
      message: "deleted",
      users,
      removedId,
    });
  } else {
    res.status(404).send("id Not Found");
  }
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);

  res.json({
    message: "new product created successfully",
    products,
  });
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  const prod = products.find((uid) => uid.id === parseInt(id));

  if (!prod) {
    return res.status(404).send("product Not Found");
  }

  prod.name = updated.name || prod?.name;
  prod.price = updated.price || prod?.price;

  res.json({
    message: "updated succesfuly",
    products,
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const prodIndex = products.findIndex((uid) => uid.id === parseInt(id));

  if (prodIndex !== -1) {
    products.splice(prodIndex, 1);
    res.json({
      message: "product delted successfully",
      products,
    });
  } else {
    return res.status(404).send("product Not Found");
  }
});

app.get("/search", (req, res) => {
  const name = req.query.n;
  const age = req.query.a;

  res.send(`search result Name = ${name} and age = ${age}`);
});

const validate = (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    res.status(400).send("invlaid id. must be a number");
  }
  next();
};

app.get("/check/:id", validate, (req, res) => {
  res.send(` id ${req.params.id} is valid`);
});

app.get("/profile/:username", (req, res) => {
  const username = req.params.username;

  res.send(`hello ${username}`);
});

const validateParam = (req, res, next) => {
  const block = req.params.block;
  if (block) {
    res.status(400).send("is not allowed");
  }

  next();
};

app.get("/:block", validateParam, (req, res) => {
  res.send("welcome");
});

app.get("/filter", (req, res) => {
  const role = req.query.role;
  if (role === "admin") {
    res.send(`filtering for role :${role}`);
  } else {
    res.send("it is not admin");
  }
});

app.use((_, res) => {
  res.status(404).send("Route Not Found");
});

app.listen(PORT, () => {
  console.log(`server satrted ${PORT}`);
});
