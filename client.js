const axios = require("axios");

axios
  .get("http://localhost:5001/products")
  .then((res) => {
    console.log("this is my products", res.data);
  })
  .catch((error) => {
    console.error("Error during axios", error.message);
  });

axios
  .post("http://localhost:5001/users", { id: 4, name: "Abel" })
  .then((res) => {
    console.log("this is my products", res.data);
  })
  .catch((error) => {
    console.error("Error during axios", error.message);
  });

axios
  .delete(`http://localhost:5001/users/1`)
  .then((res) => {
    console.log("this is my products", res.data);
  })
  .catch((error) => {
    console.error("Error during axios", error.message);
  });
