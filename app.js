const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const routerIndex = require("./src/routes/index");
const routerUsers = require("./src/routes/users");
const routerProducts = require("./src/routes/products");
const routerProductsIn = require("./src/routes/productIn");
const routerProductsOut = require("./src/routes/productOut");




app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/", routerIndex);
app.use("/users", routerUsers);
app.use("/products", routerProducts);
app.use("/productsIn", routerProductsIn);
app.use("/productsOut", routerProductsOut);




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});