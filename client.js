const axios = require("axios");

axios
  .get("http://localhost:5001/products")
  .then((res) => {
    console.log("this is my products", res.data);
  })
  .catch((error) => {
    console.error("Error during axios", error.message);
  });
