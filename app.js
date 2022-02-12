const express = require("express");
const app = express();
const path = require("path");

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

const pages = [
  "index",
  "productDetail",
  "register",
  "login",
  "aboutUs",
  "contact",
  "productCart",
  "facture",
  "payForm",
  "privacyPolitics",
  "agreePolitics",
];

pages.forEach((page) => {
  if (page == "index") {
    app.get("/", (req, res) => {
      const home = path.join(__dirname, "./views/index.html");
      res.sendFile(home);
    });
  } else {
    app.get(`/${page}`, (req, res) => {
      const home = path.join(__dirname, `./views/${page}.html`);
      res.sendFile(home);
    });
  }
});

const port = 3000;
app.listen(port, () =>
  console.log(`El servidor se está ejecutando en el puerto ${port}`)
);
