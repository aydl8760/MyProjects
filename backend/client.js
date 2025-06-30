const axios = require("axios");

axios
  .get("http://localhost:5001/product")
  .then((res) => {
    console.log("this is my product", res.data);
  })
  .catch((error) => {
    console.error("Error during axios", error.message);
  });

axios
  .post("http://localhost:5001/users", { id: 4, name: "Abel" })
  .then((res) => {
    console.log("this is my user", res.data);
  })
  .catch((error) => {
    console.error("Error during axios", error.message);
  });

axios
  .delete(`http://localhost:5001/users/1`)
  .then((res) => {
    console.log("this is my user", res.data);
  })
  .catch((error) => {
    console.error("Error during axios", error.message);
  });

axios
  .post("http://localhost:5001/products", {
    id: 4,
    name: "disktop",
    price: 5000,
  })
  .then((res) => {
    console.log("this is my products", res.data);
  })
  .catch((error) => {
    console.error("Error during axios", error.message);
  });

axios
  .put("http://localhost:5001/products/2", {
    name: "disktop",
    price: 5000,
  })
  .then((res) => {
    console.log("this is my products", res.data);
  })
  .catch((error) => {
    console.error("Error during axios", error.message);
  });

axios
  .delete(`http://localhost:5001/products/1`)
  .then((res) => {
    console.log("this is my products", res.data);
  })
  .catch((error) => {
    console.error("Error during axios", error.message);
  });
