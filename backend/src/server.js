const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectdb = require("../config/db");
const userRoutes = require("./route/userRoute");
const postRoutes = require("./route/postRoute");

dotenv.config();
connectdb();

const app = express();
const PORT = 5007;
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use((_, res) => {
  res.status(404).send("Route Not Found");
});

const errorHandling = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Internal Server Error — Something broke!" });
};

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`server satrted ${PORT}`);
});
